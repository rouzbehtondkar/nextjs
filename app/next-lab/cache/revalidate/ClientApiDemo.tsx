"use client";

import { useState } from "react";

type Post = { id: number; title: string };

export default function ClientApiDemo() {
  const [post, setPost] = useState<Post | null>(null);
  const [requestId, setRequestId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function fetchPost() {
    const id = crypto.randomUUID();
    setRequestId(id);
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/1?requestId=${id}`,
        { cache: "no-store" }
      );

      if (!response.ok) {
        throw new Error("API request failed");
      }

      const data: Post = await response.json();
      setPost(data);
    } catch {
      setError("دریافت داده از JSONPlaceholder ناموفق بود.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-6 rounded-2xl border p-5" style={{ borderColor: "var(--border)" }}>
      <p className="theme-muted text-sm">Browser → JSONPlaceholder</p>
      <h2 className="theme-text mt-2 text-xl font-black">درخواست را مستقیم در Network ببین</h2>
      <p className="theme-muted-strong mt-2 text-sm leading-7">
        این قسمت عمداً در مرورگر اجرا می‌شود تا Request را در DevTools Network ببینی.
      </p>

      <button
        type="button"
        onClick={fetchPost}
        className="mt-4 rounded-xl bg-violet-600 px-5 py-3 font-bold text-white"
      >
        {loading ? "در حال درخواست..." : "ارسال درخواست"}
      </button>

      {requestId && (
        <>
          <p className="theme-muted mt-5 text-sm">Request ID</p>
          <p className="theme-text mt-2 break-all font-mono text-xs">{requestId}</p>
          <p className="theme-muted mt-3 text-xs leading-6">
            در Network عبارت jsonplaceholder را جستجو کن؛ Request URL شامل همین ID است.
          </p>
        </>
      )}

      {error && <p className="mt-4 text-sm font-bold">{error}</p>}

      {post && (
        <div className="mt-5 rounded-xl border p-4" style={{ borderColor: "var(--border)" }}>
          <p className="theme-muted text-sm">API response</p>
          <p className="theme-text mt-2 font-bold">#{post.id} — {post.title}</p>
        </div>
      )}
    </div>
  );
}
