'use client';
// UI
import SectionLayout from "@/components/layout/SectionLayout";
import { CardLayout } from "@/components/featured/FeatureCard"
import { Heart, MessageCircle, ArrowLeft, Ellipsis, Eye} from 'lucide-react';
import { Mybutton } from "@/components/common/button";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks'
import { formatDistanceToNow } from 'date-fns';
import Image from "next/image";
import toast from "react-hot-toast";
// UI Navigation
import Link from "next/link";
// UX
import { useState } from "react";
// Blog Post Data Type
import {Post} from "@/components/dataType/blogPost/types"
// Session Data Type
import type { Session } from '@auth/core/types';
// AnonymousViewTracker
import AnonymousViewTracker from '@/components/blogpost/anonymousViewTracker';

export default function BLOGPOST({ post: initialPost, session: currentSession}: {post: Post; session: Session | null}) {
    // Get Session
    const mysession = currentSession;
    // Variable to store Post
    const [post, setPost] = useState<Post>(initialPost);
    // Variable to store Comment
    const [commentText, setCommentText] = useState('');
    // Variable to store Comment Id used for clicking button
    const [openCommentId, setOpenCommentId] = useState<string | null>(null);

    // Submit Comment Function
    const handleCommentSubmit = async () => {
        if (!mysession?.user?.id) {
            toast.error('You must be logged in to comment');
            return;
        }
        // Validate input
        if ( !commentText ) {
            toast.error('Oops! You forgot to write your comment.');
            return;
        }       
        const res = await fetch('/api/add-comment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                postId: post?.id,
                content: commentText
            })
        });       
        if (res.ok) {
            const newComment = await res.json();
            setPost((prev) => {
                if (!prev) return prev;
                const updatedComments = [newComment, ...prev.comments];
                return {
                    ...prev,
                    comments: updatedComments,
                    commentsCount: updatedComments.length
                };
            });
            setCommentText('');
        } else {
            console.error("Failed to add comment");
        }    
    }

    // Like Function
    const handleLike = async () => {
         if (!mysession?.user?.id) {
            toast.error('You must be logged in to like a post');
            return;
        }
        // Optimistically update UI
        setPost((prev) => {
            if (!prev) return prev;
            return {
                ...prev,
                likesCount: prev.hasLiked ? prev.likesCount - 1 : prev.likesCount + 1,
                hasLiked: !prev.hasLiked
            };
        });
        const res = await fetch('/api/like-post', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                postId: post?.id
            }),
        });      
        if (res.ok) {
            await res.json();
        }  else {
            // Roll back UI if it failed
            setPost((prev) => {
                if (!prev) return prev;
                return {
                    ...prev,
                    likesCount: prev.hasLiked ? prev.likesCount + 1 : prev.likesCount - 1,
                    hasLiked: !prev.hasLiked
                };
            });
            console.error("Failed to add like");
        }
    }

    // Delete Comment Function
    const handleDelete = async (commentId: string) => {
        if (!mysession?.user?.id) {
            toast.error('You must be logged in to delete a comment');
            return;
        }

        const res = await fetch('/api/delete-comment', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ commentId })
        });

        if (res.ok) {
            setPost((prev) => {
            if (!prev) return prev;
            return {
                ...prev,
                comments: prev.comments.filter((c) => c.id !== commentId),
                commentsCount: prev.commentsCount - 1,
            };
            });
            setOpenCommentId(null); // close dropdown
        } else {
            console.error('Failed to delete comment');
        }
    }

    // Notify Subscriber Function
    const handleNotifySubscriber = async () => {
        toast.loading("Sending notifications...");  
        const res = await fetch("/api/notify", { 
            method: "POST", 
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify ({
                postTitle: post?.title
            })
        });
        toast.dismiss();
        if (res.ok) {
            toast.success("Subscribers notified!");
        } else  {
            toast.error("Failed to notify subscribers.");
        }
    }

    if (!post) return <div>Loading...</div>;
    
    return(
        <div>
        {!mysession?.user?.id && <AnonymousViewTracker postId={post.id} />}
            <SectionLayout>
                <CardLayout>
                    {/* Back to Home */}
                    <Link href={"/"}>
                        <div className="flex items-center space-x-2 hover:scale-[1.01] transition-all duration-200 ease-in-out">
                            <ArrowLeft className="w-6 h-6 md:w-8 md:h-8"/>
                            <p className="text-sm md:text-base">Back to home</p>
                        </div>
                    </Link>
                    {/* Post */}
                    <div className="flex flex-col px-4 py-8">
                        {/* Title */}
                        <h1 className="font-serif font-semibold text-lg md:text-3xl">
                            {post.title}
                        </h1>
                        {/* Author, Img, Date */}
                        <div className="flex flex-row items-center pt-2 pb-4 border-b-1 border-gray-300">
                            <div className="w-8 h-8 bg-cover bg-center rounded-full" 
                            style={{ backgroundImage: `url(${post.author?.image ?? '/default.jpg'})`,}}>
                            </div>
                            <div className="flex flex-col px-4">
                                <p className="font-semibold text-sm">{post.author.name}</p>
                                <p className="text-xs">
                                    {formatDistanceToNow(new Date(post?.createdAt), { addSuffix: true })}
                                </p>
                            </div> 
                        </div>
                        {/* Background/Thumbnail */}
                        <div className="relative w-full aspect-[17/10] my-5 md:my-10 rounded-md overflow-hidden">
                            <Image
                                src={post.thumbnailUrl}
                                alt={post.title}
                                fill
                                priority
                                sizes="(max-width: 768px) 100vw, 850px"
                                className="object-cover rounded-md"
                            />
                        </div>
                        {/* Content */}
                        <div className="prose prose-neutral max-w-none pb-4">               
                            <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}
                            components={{
                            img: ({ node, ...props }) => (
                                <img {...props} className="mb-4 rounded-md" />
                            ),
                            p: ({ node, ...props }) => (
                                <p {...props} className="mb-4" />
                            ),
                            blockquote: ({ node, ...props }) => (
                                <blockquote {...props} className="border-l-4 pl-4 italic text-gray-600 mb-4" />
                            ),
                            }}>
                                {post.content}
                            </ReactMarkdown>
                        </div>
                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-2 md:mb-3">
                            {post.tags.map((tag, index) => (
                                <div key={index} className="group relative inline-block">
                                    <span className="inline-flex items-center bg-gray-300 text-gray-800 px-3 py-1 rounded-full text-sm font-medium cursor-pointer">
                                        <span className="mr-2 inline-block w-1.5 h-1.5 rounded-full bg-gray-600" /> 
                                            {tag}
                                    </span>
                                     <span className="absolute left-1/2 -translate-x-1/2 bottom-[calc(100%+4px)] mt-2 ml-2 whitespace-nowrap px-2 py-1 text-xs text-black bg-white dark:bg-[#ffffff4d] dark:text-white rounded-md shadow opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50">
                                        #{tag}
                                    </span>                                    
                                </div>
                            ))}
                        </div>
                        {mysession?.user.isMasterAdmin && 
                            <Mybutton onClick={handleNotifySubscriber} content="Notify Subscriber" pxDefault="px-2" pyDefault="py-2"/> 
                        }
                        {/* Likes, Comments & Views */}
                        <div className="flex justify-between px-2 py-2 border-y-1 border-gray-300">
                            <div>
                                <div className="group relative inline-block">
                                    <button onClick={handleLike} className="px-2 py-1 border-1 rounded-full inline-flex items-center space-x-2 mr-3 hover:bg-gray-200 dark:hover:bg-neutral-700 cursor-pointer">
                                        <Heart className={`w-4 h-4 hover:fill-[#FF0000] hover:stroke-[#FF0000] transition-colors duration-200 ${post.hasLiked ? 'fill-[#FF0000] stroke-[#FF0000]' : ''}`}/> 
                                        <p className="text-xs">{post.likesCount}</p>
                                    </button>
                                     <span className="absolute left-1/2 -translate-x-1/2 top-[calc(100%+4px)] mt-2 ml-2 whitespace-nowrap px-2 py-1 text-xs text-black bg-white dark:bg-[#ffffff4d] dark:text-white rounded-md shadow opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50">
                                        Like this post
                                    </span>
                                </div>
                                <div className="group relative inline-block">
                                    <button className="px-2 py-1 border-1 rounded-full inline-flex items-center space-x-2 hover:bg-gray-200 dark:hover:bg-neutral-700 cursor-pointer">
                                        <MessageCircle className="w-4 h-4 hover:text-blue-500 transition-colors duration-200"/> 
                                        <p className="text-xs">{post.commentsCount}</p>
                                    </button>
                                     <span className="absolute left-1/2 -translate-x-1/2 top-[calc(100%+4px)] mt-2 ml-2 whitespace-nowrap px-2 py-1 text-xs text-black bg-white dark:bg-[#ffffff4d] dark:text-white rounded-md shadow opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50">
                                        View comments
                                    </span>                                    
                                </div>
                            </div>
                            
                            <div className="group relative inline-flex items-center cursor-pointer">
                                <Eye className="w-5 h-5 mr-1.5" /> 
                                <p className="text-sm">{post.views + post.anonymousViews}</p>
                                <span className="absolute left-1/2 -translate-x-1/2 top-[calc(100%+4px)] mt-2 ml-2 whitespace-nowrap px-2 py-1 text-xs text-black bg-white dark:bg-[#ffffff4d] dark:text-white rounded-md shadow opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50">
                                    Views
                                </span> 
                            </div>
                        </div>
                        {/* Comments Count */}
                        <div className="my-4">
                            <h1 className="font-sans font-semibold text-md md:text-xl">Comments ({post.commentsCount})</h1>
                        </div>
                        {/* Post Comment */}
                        <div className="flex flex-row items-start md:mt-5">
                            <div className="w-8 h-8 min-w-8 min-h-8 bg-cover bg-center rounded-full mr-3"  
                            style={{ backgroundImage: `url(${mysession?.user?.image ?? '/default.jpg'})`,}}>
                            </div>
                            <textarea name="comment" id="comment" value={commentText} onChange={(e) => setCommentText(e.target.value)} placeholder="Write a comment..." className="flex-grow px-3 py-2 rounded-md border-1 border-gray-300 placeholder-gray-500 dark:placeholder-white focus:outline-none focus:ring-2 focus:ring-gray-300" rows={3}/>
                        </div>
                        <div className="flex justify-end mt-3">
                            <Mybutton onClick={handleCommentSubmit} content="Post" pxDefault="px-3" pyDefault="py-2"/>
                        </div>
                        {/* Comments */}
                        <div className="flex flex-col space-y-3 mt-3">
                            {/* Map all comments*/}
                            {post.comments.map((comment) => (
                                <div key={comment.id} className="flex flex-row items-start mt-3 md:mt-2">
                                    {/* Comment User Photo */}
                                    <div className="w-8 h-8 min-w-8 min-h-8 bg-cover bg-center rounded-full mr-3"  
                                    style={{ backgroundImage: `url(${comment.author?.image ?? '/default.jpg'})`,}}>
                                    </div>
                                    {/* Right Content */}
                                    <div className="w-full flex flex-col space-y-1">
                                        <div className="flex justify-between items-center">
                                            {/* Name & Date */}
                                            <div className="inline-flex space-x-3">
                                                <h1 className="font-sans font-medium text-sm md:text-md">{comment.author?.name ?? 'Anonymous'}</h1>
                                                <h2 className="text-gray-500 font-sans font-medium text-sm md:text-md">{formatDistanceToNow(new Date(comment?.createdAt), { addSuffix: true })}</h2>
                                            </div>
                                            {/* Delete Comment */}
                                            {comment.author?.id === mysession?.user?.id && (
                                                <div className="relative inline-block text-left">
                                                    <button onClick={() => setOpenCommentId(openCommentId === comment.id ? null : comment.id)}  className="cursor-pointer"><Ellipsis className="w-4 md:w-5 text-gray-500"/></button>
                                                    {openCommentId === comment.id && (
                                                        <div onClick={() => handleDelete(comment.id)} className="absolute right-0 z-10 mt-2 w-30 origin-top-right rounded-md bg-[#f7f7f7] px-6 py-4 shadow-md transition-all duration-300 ease-in-out hover:bg-[#e7e7e7]">
                                                            <div className="cursor-pointer font-bold text-red-700">
                                                                Delete
                                                            </div>
                                                        </div>
                                                        )
                                                    }
                                                </div>
                                            )}
                                        </div>
                                        {/* Comment Content */}
                                        <p className="font-sans font-normal text-base">{comment.content}</p>
                                    </div>
                                </div>
                            ))}  
                        </div>
                    </div>
                </CardLayout>
            </SectionLayout>
        </div>
    )
}

