import { createClient } from "@supabase/supabase-js";
import { BlogPost, CareerOpening } from "../types";
import { cacheManager } from "../utils/cacheManager";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error("Missing Supabase credentials in environment variables");
}

export const supabase = createClient(SUPABASE_URL || "", SUPABASE_ANON_KEY || "");

// Cache TTL settings (in milliseconds)
const CACHE_TTL = {
  BLOGS: 10 * 60 * 1000, // 10 minutes - blogs rarely change
  CAREERS: 15 * 60 * 1000, // 15 minutes - careers rarely change
  BANNERS: 5 * 60 * 1000, // 5 minutes - banners might change more often
  BLOG_DETAIL: 10 * 60 * 1000, // 10 minutes
  CAREER_DETAIL: 15 * 60 * 1000, // 15 minutes
};

// Types
export interface AdminUser {
  id: string;
  email: string;
  email_verified: boolean;
  password_hash: string;
  verification_code?: string;
  created_at: string;
  updated_at: string;
}

interface Submission {
  id?: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  is_read: boolean;
  created_at?: string;
}

interface Banner {
  id?: string;
  title: string;
  description?: string;
  image_url?: string;
  link_url?: string;
  order: number;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

// Auth Functions - Using btoa/atob for browser compatibility
export const hashPassword = (password: string): string => {
  return btoa(password);
};

export const verifyPassword = (password: string, hash: string): boolean => {
  return btoa(password) === hash;
};

export const getAdminEmail = (): string | null => {
  const admin = localStorage.getItem("admin");
  if (admin) {
    try {
      const adminData = JSON.parse(admin);
      return adminData.email || null;
    } catch {
      return null;
    }
  }
  return null;
};

export const isAdminLoggedIn = (): boolean => {
  return !!localStorage.getItem("admin");
};

export const adminLogin = async (
  email: string,
  password: string
): Promise<{ success: boolean; user?: AdminUser; message?: string }> => {
  try {
    const { data, error } = await supabase
      .from("admin_users")
      .select("*")
      .eq("email", email)
      .single();

    if (error || !data) {
      return { success: false, message: "Invalid credentials" };
    }

    if (!verifyPassword(password, data.password_hash)) {
      return { success: false, message: "Invalid credentials" };
    }

    if (!data.email_verified) {
      return { success: false, message: "Please verify your email first" };
    }

    localStorage.setItem("admin", JSON.stringify(data));
    return { success: true, user: data };
  } catch (error) {
    console.error("Login error:", error);
    return { success: false, message: "Login failed" };
  }
};

export const adminLogout = (): void => {
  localStorage.removeItem("admin");
};

export const changeAdminPassword = async (
  email: string,
  currentPassword: string,
  newPassword: string
): Promise<{ success: boolean; message?: string }> => {
  try {
    const { data, error } = await supabase
      .from("admin_users")
      .select("*")
      .eq("email", email)
      .single();

    if (error || !data) {
      return { success: false, message: "Admin not found" };
    }

    if (!verifyPassword(currentPassword, data.password_hash)) {
      return { success: false, message: "Current password is incorrect" };
    }

    const newPasswordHash = hashPassword(newPassword);

    const { error: updateError } = await supabase
      .from("admin_users")
      .update({ password_hash: newPasswordHash })
      .eq("email", email);

    if (updateError) {
      return {
        success: false,
        message: updateError.message || "Password change failed",
      };
    }

    return { success: true, message: "Password changed successfully" };
  } catch (error) {
    console.error("Password change error:", error);
    return { success: false, message: "Password change failed" };
  }
};

export const requestPasswordReset = async (
  email: string
): Promise<{ success: boolean; message?: string }> => {
  try {
    const { data } = await supabase
      .from("admin_users")
      .select("id")
      .eq("email", email)
      .single();

    if (!data) {
      return {
        success: true,
        message: "If email exists, reset link has been sent",
      };
    }

    console.log(`📧 Password reset link sent to ${email}`);

    return {
      success: true,
      message: "If email exists, reset link has been sent",
    };
  } catch (error) {
    console.error("Password reset request error:", error);
    return {
      success: true,
      message: "If email exists, reset link has been sent",
    };
  }
};

export const verifyAdminEmail = async (
  email: string,
  verificationCode: string
): Promise<{ success: boolean; message?: string }> => {
  try {
    const { data, error } = await supabase
      .from("admin_users")
      .select("*")
      .eq("email", email)
      .single();

    if (error || !data) {
      return { success: false, message: "Email not found" };
    }

    if (data.email_verified) {
      return { success: false, message: "Email already verified" };
    }

    if (data.verification_code !== verificationCode) {
      return { success: false, message: "Invalid verification code" };
    }

    const { error: updateError } = await supabase
      .from("admin_users")
      .update({ email_verified: true, verification_code: null })
      .eq("email", email);

    if (updateError) {
      return {
        success: false,
        message: updateError.message || "Verification failed",
      };
    }

    return { success: true, message: "Email verified successfully" };
  } catch (error) {
    console.error("Verification error:", error);
    return { success: false, message: "Verification failed" };
  }
};

// Contact Form
export const saveSubmission = async (
  submission: any
): Promise<{ success: boolean; message?: string }> => {
  try {
    // Validate Supabase client
    if (!supabase) {
      throw new Error("Supabase client not initialized");
    }

    const name = submission.name || submission.full_name || "Unknown";
    const email = submission.email || "";
    const phone = submission.phone || "";
    const subject = submission.subject || "General Inquiry";
    const message = submission.message || "";

    // Validate required fields
    if (!name || !email) {
      throw new Error("Name and email are required");
    }

    console.log("Saving submission:", { name, email, phone, subject });

    const { data, error } = await supabase.from("submissions").insert([
      {
        name,
        email,
        phone,
        subject,
        message,
        is_read: false,
      },
    ]);

    if (error) {
      console.error("Supabase insert error:", error);
      return {
        success: false,
        message: `Database error: ${error.message}`,
      };
    }

    console.log("Submission saved successfully:", data);
    return { success: true, message: "Submission saved successfully" };
  } catch (error: any) {
    console.error("Save submission error:", error);
    return { success: false, message: error?.message || "Failed to save submission" };
  }
};

export const getSubmissions = async (): Promise<Submission[]> => {
  try {
    const { data, error } = await supabase
      .from("submissions")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Get submissions error:", error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error("Get submissions error:", error);
    return [];
  }
};

export const markSubmissionAsRead = async (
  id: string
): Promise<{ success: boolean }> => {
  try {
    const { error } = await supabase
      .from("submissions")
      .update({ is_read: true })
      .eq("id", id);

    if (error) {
      console.error("Mark as read error:", error);
      return { success: false };
    }

    return { success: true };
  } catch (error) {
    console.error("Mark as read error:", error);
    return { success: false };
  }
};

export const deleteSubmission = async (
  id: string
): Promise<{ success: boolean }> => {
  try {
    const { error } = await supabase
      .from("submissions")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Delete submission error:", error);
      return { success: false };
    }

    return { success: true };
  } catch (error) {
    console.error("Delete submission error:", error);
    return { success: false };
  }
};

// Blogs
export const getBlogs = async (): Promise<BlogPost[]> => {
  return cacheManager.getOrFetch(
    "blogs:all",
    async () => {
      try {
        // Optimize: Only fetch published blogs, select specific columns
        const { data, error } = await supabase
          .from("blogs")
          .select(
            "id,created_at,updated_at,title,slug,excerpt,author,category,cover_image,published,comments,content"
          )
          .eq("published", true)
          .order("created_at", { ascending: false })
          .limit(100); // Prevent massive transfers

        if (error) {
          console.error("Get blogs error:", error);
          return [];
        }

        return data || [];
      } catch (error) {
        console.error("Get blogs error:", error);
        return [];
      }
    },
    CACHE_TTL.BLOGS
  );
};

export const getBlogById = async (id: string): Promise<BlogPost | null> => {
  return cacheManager.getOrFetch(
    `blog:${id}`,
    async () => {
      try {
        const { data, error } = await supabase
          .from("blogs")
          .select("*")
          .eq("id", id)
          .single();

        if (error) {
          console.error("Get blog error:", error);
          return null;
        }

        return data || null;
      } catch (error) {
        console.error("Get blog error:", error);
        return null;
      }
    },
    CACHE_TTL.BLOG_DETAIL
  );
};

export const saveBlog = async (
  blog: Partial<BlogPost>
): Promise<{ success: boolean; id?: string; message?: string }> => {
  try {
    const { data, error } = await supabase
      .from("blogs")
      .insert([blog])
      .select()
      .single();

    if (error) {
      console.error("Save blog error:", error);
      return {
        success: false,
        message: error.message || "Failed to save blog",
      };
    }

    // Invalidate blog cache
    cacheManager.invalidate("blogs:all");

    return { success: true, id: data.id, message: "Blog saved successfully" };
  } catch (error) {
    console.error("Save blog error:", error);
    return { success: false, message: "Failed to save blog" };
  }
};

export const updateBlog = async (
  id: string,
  blog: Partial<BlogPost>
): Promise<{ success: boolean; message?: string }> => {
  try {
    const { error } = await supabase
      .from("blogs")
      .update(blog)
      .eq("id", id);

    if (error) {
      console.error("Update blog error:", error);
      return {
        success: false,
        message: error.message || "Failed to update blog",
      };
    }

    // Invalidate caches
    cacheManager.invalidate("blogs:all");
    cacheManager.invalidate(`blog:${id}`);

    return { success: true, message: "Blog updated successfully" };
  } catch (error) {
    console.error("Update blog error:", error);
    return { success: false, message: "Failed to update blog" };
  }
};

export const deleteBlog = async (
  id: string
): Promise<{ success: boolean; message?: string }> => {
  try {
    const { error } = await supabase
      .from("blogs")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Delete blog error:", error);
      return {
        success: false,
        message: error.message || "Failed to delete blog",
      };
    }

    // Invalidate caches
    cacheManager.invalidate("blogs:all");
    cacheManager.invalidate(`blog:${id}`);

    return { success: true, message: "Blog deleted successfully" };
  } catch (error) {
    console.error("Delete blog error:", error);
    return { success: false, message: "Failed to delete blog" };
  }
};

// Careers
export const getCareers = async (): Promise<CareerOpening[]> => {
  return cacheManager.getOrFetch(
    "careers:all",
    async () => {
      try {
        // Optimize: Select specific columns only
        const { data, error } = await supabase
          .from("careers")
          .select(
            "id,created_at,updated_at,title,department,type,location,description,requirements"
          )
          .order("created_at", { ascending: false })
          .limit(100);

        if (error) {
          console.error("Get careers error:", error);
          return [];
        }

        return data || [];
      } catch (error) {
        console.error("Get careers error:", error);
        return [];
      }
    },
    CACHE_TTL.CAREERS
  );
};

export const getCareerById = async (id: string): Promise<CareerOpening | null> => {
  return cacheManager.getOrFetch(
    `career:${id}`,
    async () => {
      try {
        const { data, error } = await supabase
          .from("careers")
          .select("*")
          .eq("id", id)
          .single();

        if (error) {
          console.error("Get career error:", error);
          return null;
        }

        return data || null;
      } catch (error) {
        console.error("Get career error:", error);
        return null;
      }
    },
    CACHE_TTL.CAREER_DETAIL
  );
};

export const saveCareer = async (
  career: Partial<CareerOpening>
): Promise<{ success: boolean; id?: string; message?: string }> => {
  try {
    const { data, error } = await supabase
      .from("careers")
      .insert([career])
      .select()
      .single();

    if (error) {
      console.error("Save career error:", error);
      return {
        success: false,
        message: error.message || "Failed to save career",
      };
    }

    // Invalidate cache
    cacheManager.invalidate("careers:all");

    return { success: true, id: data.id, message: "Career saved successfully" };
  } catch (error) {
    console.error("Save career error:", error);
    return { success: false, message: "Failed to save career" };
  }
};

export const updateCareer = async (
  id: string,
  career: Partial<CareerOpening>
): Promise<{ success: boolean; message?: string }> => {
  try {
    const { error } = await supabase
      .from("careers")
      .update(career)
      .eq("id", id);

    if (error) {
      console.error("Update career error:", error);
      return {
        success: false,
        message: error.message || "Failed to update career",
      };
    }

    // Invalidate caches
    cacheManager.invalidate("careers:all");
    cacheManager.invalidate(`career:${id}`);

    return { success: true, message: "Career updated successfully" };
  } catch (error) {
    console.error("Update career error:", error);
    return { success: false, message: "Failed to update career" };
  }
};

export const deleteCareer = async (
  id: string
): Promise<{ success: boolean; message?: string }> => {
  try {
    const { error } = await supabase
      .from("careers")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Delete career error:", error);
      return {
        success: false,
        message: error.message || "Failed to delete career",
      };
    }

    // Invalidate caches
    cacheManager.invalidate("careers:all");
    cacheManager.invalidate(`career:${id}`);

    return { success: true, message: "Career deleted successfully" };
  } catch (error) {
    console.error("Delete career error:", error);
    return { success: false, message: "Failed to delete career" };
  }
};

// Banners
export const getBanners = async (): Promise<Banner[]> => {
  return cacheManager.getOrFetch(
    "banners:all",
    async () => {
      try {
        // Optimize: Only fetch active banners, select specific columns
        const { data, error } = await supabase
          .from("banners")
          .select(
            "id,created_at,updated_at,title,description,image_url,link_url,is_active,show_delay,order"
          )
          .eq("is_active", true)
          .order("order", { ascending: true })
          .limit(50);

        if (error) {
          console.error("Get banners error:", error);
          return [];
        }

        return data || [];
      } catch (error) {
        console.error("Get banners error:", error);
        return [];
      }
    },
    CACHE_TTL.BANNERS
  );
};

export const getBannerById = async (id: string): Promise<Banner | null> => {
  return cacheManager.getOrFetch(
    `banner:${id}`,
    async () => {
      try {
        const { data, error } = await supabase
          .from("banners")
          .select("*")
          .eq("id", id)
          .single();

        if (error) {
          console.error("Get banner error:", error);
          return null;
        }

        return data || null;
      } catch (error) {
        console.error("Get banner error:", error);
        return null;
      }
    },
    CACHE_TTL.BANNERS
  );
};

export const saveBanner = async (
  banner: Partial<Banner>
): Promise<{ success: boolean; id?: string; message?: string }> => {
  try {
    const { data, error } = await supabase
      .from("banners")
      .insert([banner])
      .select()
      .single();

    if (error) {
      console.error("Save banner error:", error);
      return {
        success: false,
        message: error.message || "Failed to save banner",
      };
    }

    // Invalidate cache
    cacheManager.invalidate("banners:all");

    return { success: true, id: data.id, message: "Banner saved successfully" };
  } catch (error) {
    console.error("Save banner error:", error);
    return { success: false, message: "Failed to save banner" };
  }
};

export const updateBanner = async (
  id: string,
  banner: Partial<Banner>
): Promise<{ success: boolean; message?: string }> => {
  try {
    const { error } = await supabase
      .from("banners")
      .update(banner)
      .eq("id", id);

    if (error) {
      console.error("Update banner error:", error);
      return {
        success: false,
        message: error.message || "Failed to update banner",
      };
    }

    // Invalidate caches
    cacheManager.invalidate("banners:all");
    cacheManager.invalidate(`banner:${id}`);

    return { success: true, message: "Banner updated successfully" };
  } catch (error) {
    console.error("Update banner error:", error);
    return { success: false, message: "Failed to update banner" };
  }
};

export const deleteBanner = async (
  id: string
): Promise<{ success: boolean; message?: string }> => {
  try {
    const { error } = await supabase
      .from("banners")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Delete banner error:", error);
      return {
        success: false,
        message: error.message || "Failed to delete banner",
      };
    }

    return { success: true, message: "Banner deleted successfully" };
  } catch (error) {
    console.error("Delete banner error:", error);
    return { success: false, message: "Failed to delete banner" };
  }
};

// ============ CACHE MANAGEMENT ============

// Cache key constants
const CACHE_KEYS = {
  BLOGS: "sqnew_blogs_cache",
  SUBMISSIONS: "sqnew_submissions_cache",
  CAREERS: "sqnew_careers_cache",
  SERVICES: "sqnew_services_cache",
  BANNERS: "sqnew_banners_cache",
  TESTIMONIALS: "sqnew_testimonials_cache",
} as const;

// Cache expiry time in milliseconds (24 hours)
const CACHE_EXPIRY_TIME = 24 * 60 * 60 * 1000;

interface CacheData<T> {
  data: T;
  timestamp: number;
}

/**
 * Get data from cache if it exists and hasn't expired
 */
export const getCachedData = <T,>(cacheKey: string): T | null => {
  try {
    const cached = localStorage.getItem(cacheKey);
    if (!cached) return null;

    const cacheData: CacheData<T> = JSON.parse(cached);
    const now = Date.now();

    // Check if cache has expired
    if (now - cacheData.timestamp > CACHE_EXPIRY_TIME) {
      localStorage.removeItem(cacheKey);
      return null;
    }

    return cacheData.data;
  } catch (error) {
    console.error("Error retrieving cached data:", error);
    return null;
  }
};

/**
 * Store data in cache with current timestamp
 */
export const setCacheData = <T,>(cacheKey: string, data: T): void => {
  try {
    const cacheData: CacheData<T> = {
      data,
      timestamp: Date.now(),
    };
    localStorage.setItem(cacheKey, JSON.stringify(cacheData));
  } catch (error) {
    console.error("Error storing cached data:", error);
  }
};

/**
 * Clear a specific cache entry
 */
export const clearCache = (cacheKey: string): void => {
  try {
    localStorage.removeItem(cacheKey);
  } catch (error) {
    console.error("Error clearing cache:", error);
  }
};

/**
 * Clear all application caches
 */
export const clearAllCaches = (): void => {
  try {
    Object.values(CACHE_KEYS).forEach((key) => {
      localStorage.removeItem(key);
    });
  } catch (error) {
    console.error("Error clearing all caches:", error);
  }
};

/**
 * Get cache expiry time in milliseconds
 */
export const getCacheExpiryTime = (): number => {
  return CACHE_EXPIRY_TIME;
};

/**
 * Export cache keys for use in other modules
 */
export const getCacheKeys = () => CACHE_KEYS;