"use client";

import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useApp } from "@/lib/context/AppContext";
import {
  BeritaItem,
  KomentarItem,
  submitLike,
  submitView,
  submitKomentar
} from "@/lib/api/client";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function BeritaDetailPage({ params }: PageProps) {
  const router = useRouter();
  const resolvedParams = use(params);
  const newsId = resolvedParams.id;
  
  const { appData, dataLoading, showToast } = useApp();
  const [news, setNews] = useState<BeritaItem | null>(null);
  const [comments, setComments] = useState<KomentarItem[]>([]);
  
  const [hasLiked, setHasLiked] = useState(false);
  const [commentName, setCommentName] = useState("");
  const [commentText, setCommentText] = useState("");
  const [submittingComment, setSubmittingComment] = useState(false);

  useEffect(() => {
    if (dataLoading) return;

    const foundNews = (appData.berita || []).find((b) => b.id === newsId);
    
    if (foundNews) {
      setNews(foundNews);
      const filteredComments = (appData.komentar || []).filter((c) => c.newsId === newsId);
      setComments(filteredComments);
      submitView(newsId);
    } else {
      showToast("Berita Tidak Ditemukan", "Kembali ke halaman utama.", "error");
      router.push("/berita");
    }
  }, [newsId, appData.berita, appData.komentar, dataLoading, router, showToast]);

  const handleLike = async () => {
    if (hasLiked || !news) return;
    try {
      setHasLiked(true);
      setNews({ ...news, likes: news.likes + 1 });
      await submitLike(newsId);
      showToast("Berita Disukai", "Terima kasih atas partisipasi Anda!", "success");
    } catch (err) {
      console.error(err);
    }
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentName.trim() || !commentText.trim() || submittingComment) return;

    try {
      setSubmittingComment(true);
      await submitKomentar(newsId, commentName, commentText);
      
      // Append comment locally for instant UI update
      const newComment: KomentarItem = {
        newsId,
        timestamp: new Date().toISOString(),
        name: commentName,
        comment: commentText
      };
      
      setComments([newComment, ...comments]);
      setCommentText("");
      setCommentName("");
      showToast("Komentar Dikirim", "Komentar Anda berhasil diterbitkan.", "success");
    } catch (err) {
      showToast("Kirim Gagal", "Terjadi kesalahan saat memposting komentar.", "error");
    } finally {
      setSubmittingComment(false);
    }
  };

  if (dataLoading) {
    return (
      <div className="py-12 text-center text-xs text-slate-400 font-medium">
        <i className="fas fa-spinner fa-spin mr-2"></i> Membuka artikel...
      </div>
    );
  }

  if (!news) return null;

  return (
    <div className="py-8 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      {/* Back Button */}
      <Link
        href="/berita"
        className="inline-flex items-center gap-2 text-xs font-bold text-brand-purple hover:text-brand-purpleDark transition bg-violet-50 hover:bg-violet-100/80 px-4 py-2.5 rounded-xl border border-violet-100"
      >
        <i className="fas fa-arrow-left"></i> Kembali ke Berita
      </Link>

      {/* Article Container */}
      <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-lg bg-brand-purple/10 text-brand-purple text-[10px] font-extrabold uppercase tracking-widest">
              {news.category}
            </span>
            <span className="text-slate-350 text-xs">|</span>
            <span className="text-slate-400 text-xs font-semibold flex items-center gap-1">
              <i className="far fa-calendar-alt"></i>{" "}
              {new Date(news.timestamp).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>
          <h1 className="text-xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
            {news.title}
          </h1>
          <div className="flex items-center gap-4 pt-1 text-slate-500 text-xs font-semibold">
            <span className="flex items-center gap-1.5">
              <i className="far fa-eye text-slate-400"></i> {news.views} Kali Dilihat
            </span>
            <span className="flex items-center gap-1.5">
              <i className="far fa-thumbs-up text-slate-400"></i> {news.likes} Menyukai
            </span>
          </div>
        </div>

        {/* Cover Image */}
        <div className="w-full h-[240px] sm:h-[400px] bg-slate-50 rounded-2xl overflow-hidden border border-slate-100/50 relative">
          <Image src={news.coverImage} alt={news.title} fill className="object-cover" />
        </div>

        {/* Content */}
        <div className="text-slate-700 text-sm sm:text-base leading-relaxed space-y-4 whitespace-pre-line font-medium">
          {news.content}
        </div>

        {/* Like Action */}
        <div className="pt-6 border-t border-slate-100 flex justify-center">
          <button
            onClick={handleLike}
            disabled={hasLiked}
            className={`flex items-center gap-2 px-6 py-3.5 rounded-2xl border text-xs font-extrabold transition duration-350 transform hover:scale-[1.02] shadow-sm ${
              hasLiked
                ? "bg-emerald-50 text-emerald-600 border-emerald-250 cursor-default"
                : "bg-violet-50 text-brand-purple border-brand-purple/20 hover:bg-brand-purple hover:text-white"
            }`}
          >
            <i className="fas fa-thumbs-up"></i>
            {hasLiked ? "Berita Telah Disukai" : "Sukai Berita Ini"}
          </button>
        </div>
      </div>

      {/* Comments Section */}
      <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <h3 className="font-extrabold text-sm uppercase tracking-wider text-slate-400 flex items-center gap-2 border-b border-slate-50 pb-3">
          <i className="far fa-comments text-brand-purple text-base"></i> Komentar ({comments.length})
        </h3>

        {/* List of Comments */}
        <div className="space-y-4 divide-y divide-slate-50">
          {comments.length === 0 ? (
            <p className="text-xs text-slate-400 py-4 font-medium text-center">Belum ada komentar. Jadilah yang pertama!</p>
          ) : (
            comments.map((comment, index) => (
              <div key={index} className={`pt-4 ${index === 0 ? "pt-0" : ""}`}>
                <div className="flex justify-between items-start">
                  <span className="font-extrabold text-xs text-slate-800">{comment.name}</span>
                  <span className="text-[9px] text-slate-400 font-medium">
                    {new Date(comment.timestamp).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed font-semibold">{comment.comment}</p>
              </div>
            ))
          )}
        </div>

        {/* Comment Form */}
        <form onSubmit={handleCommentSubmit} className="pt-6 border-t border-slate-100 space-y-4">
          <h4 className="font-extrabold text-xs text-slate-900 uppercase tracking-wide">Tulis Komentar Anda</h4>
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-1">
              <label className="block text-[9px] font-extrabold text-slate-400 uppercase">Nama Anda</label>
              <input
                type="text"
                required
                value={commentName}
                onChange={(e) => setCommentName(e.target.value)}
                placeholder="Masukkan nama lengkap..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-brand-purple transition"
              />
            </div>
            <div className="space-y-1">
              <label className="block text-[9px] font-extrabold text-slate-400 uppercase">Isi Komentar</label>
              <textarea
                required
                rows={3}
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Tulis komentar atau apresiasi Anda di sini..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-brand-purple transition"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={submittingComment}
            className="px-6 py-2.5 rounded-xl bg-brand-purple hover:bg-brand-purpleDark text-white font-extrabold text-xs uppercase tracking-widest transition duration-300 shadow-sm flex items-center gap-2"
          >
            {submittingComment ? (
              <>
                <i className="fas fa-spinner fa-spin"></i> Mengirim...
              </>
            ) : (
              <>
                <i className="fas fa-paper-plane"></i> Kirim Komentar
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
