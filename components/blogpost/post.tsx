'use client';
//ui
import SectionLayout from "@/components/layout/SectionLayout";
import { CardLayout } from "@/components/ui/Featured/FeatureCard";
import { Heart, MessageCircle, ArrowLeft, Ellipsis} from 'lucide-react';
import { Mybutton } from "@/components/common/button";

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks'
import { formatDistanceToNow } from 'date-fns';
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {Post} from "@/components/blogpost/types"
import type { Session } from '@auth/core/types';


function BlogPost({ post: initialPost, session: currentSession}: {post: Post; session: Session | null}) {

    const mysession = currentSession;
    const [post, setPost] = useState<Post>(initialPost);
    const [commentText, setCommentText] = useState('');

    const handleCommentSubmit = async () => {
        if (!mysession?.user?.id) {
            console.error('No author ID found in session');
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
                return {
                    ...prev,
                    comments: [...prev.comments, newComment],
                    commentsCount: prev.commentsCount + 1,
                };
            });
            setCommentText('');
        } else {
            console.error("Failed to add comment");
        }    
    }

    const handleLike = async () => {
         if (!mysession?.user?.id) {
            console.error('No author ID found in session');
            return;
        }
        const res = await fetch('/api/like-post', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                postId: post?.id
            }),
        });      
        if (res.ok) {
            await res.json();
            setPost((prev) => {
                if (!prev) return prev;
                return {
                    ...prev,
                    likesCount: prev.hasLiked ? prev.likesCount - 1 : prev.likesCount + 1,
                    hasLiked: !prev.hasLiked
                };
            });
        }  else {
            console.error("Failed to add like");
        }
    }

    if (!post) return <div>Loading...</div>;
    
    return(
        <SectionLayout>
            <CardLayout>
                {/* Back to Home */}
                <Link href={"/"}>
                    <div className="flex items-center space-x-2">
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
                    <Image src={post.thumbnailUrl} alt={post.title} width={850} height={500} priority className="rounded-md my-5 md:my-10 w-full"/>   
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
                        }}>
                            {post.content}
                        </ReactMarkdown>
                    </div>
                    {/* Likes & Comments */}
                    <div className="px-2 py-2 border-y-1 border-gray-300">
                        <button onClick={handleLike} className="px-2 py-1 border-1 rounded-full inline-flex items-center space-x-2 mr-3 hover:bg-gray-100 cursor-pointer">
                            <Heart className={`w-4 h-4 hover:fill-[#FF0000] hover:stroke-[#FF0000] transition-colors duration-200 ${post.hasLiked ? 'fill-[#FF0000] stroke-[#FF0000]' : ''}`}/> 
                            <p className="text-xs">{post.likesCount}</p>
                        </button>
                        <button className="px-2 py-1 border-1 rounded-full inline-flex items-center space-x-2 hover:bg-gray-100 cursor-pointer">
                            <MessageCircle className="w-4 h-4 hover:text-blue-500 transition-colors duration-200"/> 
                            <p className="text-xs">{post.commentsCount}</p>
                        </button>
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
                        <textarea name="comment" id="comment" value={commentText} onChange={(e) => setCommentText(e.target.value)} placeholder="Write a comment..." className="flex-grow px-3 py-2 rounded-md border-1 border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300" rows={3}/>
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
                                            <button className="cursor-pointer"><Ellipsis className="w-4 md:w-5 text-gray-500"/></button>
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
    )
}

export default BlogPost;