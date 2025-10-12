'use client';
//ui
import SectionLayout from '@/components/layout/SectionLayout';
import { CardLayout } from '@/components/ui/Featured/FeatureCard';
import { Mybutton } from '@/components/common/button';
//ux
import dynamic from 'next/dynamic';
import { useState } from 'react';
const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false });
import {useSession} from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function CreatePost() {
    const { data: currentSession } = useSession();
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState<string | undefined>('');
    const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    const HandleContentImgDrop = async (event: React.DragEvent) => {
        if (isUploading) return;
        setIsUploading(true);

        event.preventDefault();
        const file = event.dataTransfer.files[0];
        if (!file || !file.type.startsWith('image/')) {
            setIsUploading(false);
            return;
        }

        const formData = new FormData();
        formData.append('image', file);

        const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
        });

        const { url } = await res.json();
        const markdown = `![${file.name}](${url})`;

        setContent((prev) => (prev ?? '') + '\n' + markdown);
        setIsUploading(false);
    };

    const HandleThumbnailImgDrop = async (e: React.DragEvent) => {
        if (isUploading) return;
        setIsUploading(true);

        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (!file || !file.type.startsWith('image/')) {
            setIsUploading(false);
            return;
        }

        const formData = new FormData();
        formData.append('image', file);

        const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
        });

        const { url } = await res.json();
        setThumbnailUrl(url);
        setIsUploading(false);
    };

    const HandleThumbnailImgUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (isUploading) return;
        setIsUploading(true);

        const file = e.target.files?.[0];
        if (!file || !file.type.startsWith('image/')) {
            setIsUploading(false);
            return;
        }

        const formData = new FormData();
        formData.append('image', file);

        const res = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
        });

        const { url } = await res.json();
        setThumbnailUrl(url);
        setIsUploading(false);
    };

    const handleSubmit = async () => {
        if (!currentSession?.user?.id) {
            console.error('No author ID found in session');
            return;
        }

        const res = await fetch('/api/create-post', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
            title,
            content,
            thumbnailUrl,
            isFeatured: false,
            tags: [],
            }),
        });
        
        if (res.ok) {
            const result = await res.json();
            console.log("Post created:", result);
            router.push(`/post/${result.slug}`); 
        } else {
            console.error("Failed to create post");
        }
    };

    return (
        <SectionLayout id="createpost">
        <CardLayout>
            <div className="flex flex-col px-4 py-2">
                {/* Page Title & Request Access Button*/}
                <div className="flex justify-between items-center">
                    <h1 className="font-serif font-semibold text-lg md:text-3xl">
                        Create a New Post
                    </h1>
                    <Mybutton iconName="ShieldUser" iconPos="left" hidden="content" content="Request Access" pxDefault="px-2" pxLg="lg:px-4" pyDefault="py-1.5"/>
                </div>
                
                {/* Form */}
                <div className="my-10 space-y-6">
                    {/* Title */}
                    <div className="flex flex-col space-y-1">
                        <h2 className="font-serif font-medium text-lg">Title</h2>
                        <input className="w-full flex-grow rounded-sm bg-gray-100 px-2 py-0.5 text-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300 outline-1"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter Title"/>
                    </div>
                    {/* Content */}
                    <div className="flex flex-col space-y-1">
                        <h2 className="font-serif font-medium text-lg">Content (Markdown)</h2>
                        <div className="bg-gray-100 rounded-sm p-2" onDragOver={(e) => e.preventDefault()} onDrop={HandleContentImgDrop}>
                            <MDEditor value={content} onChange={setContent} preview="edit" height={600}
                                className="prose prose-neutral max-w-none"/>
                        </div>
                    </div>
                    {/* Thumbnail */}
                    <div className="flex flex-col space-y-1">
                        <h2 className="font-serif font-medium text-lg">Thumbnail (Required)</h2>
                        <div onDrop={HandleThumbnailImgDrop} onDragOver={(e) => e.preventDefault()} className="relative border-2 border-dashed border-gray-300 rounded-sm bg-gray-50 p-4 flex flex-col items-center justify-center text-center hover:border-gray-400 transition">
                            {thumbnailUrl ? (
                                    <>
                                        <img src={thumbnailUrl} alt="Thumbnail preview" className="max-h-64 rounded-md" />
                                        <button onClick={() => setThumbnailUrl(null)} className="mt-2 text-sm text-red-500 hover:underline">Remove thumbnail</button>
                                    </>
                                    ) : 
                                    (
                                        <>
                                            <p className="text-sm text-gray-500 mb-2">Drag & drop your thumbnail here, or click to upload</p>
                                            <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={HandleThumbnailImgUpload}/>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h10a4 4 0 004-4M7 10l5-5m0 0l5 5m-5-5v12" />
                                            </svg>
                                        </>  
                                    )
                            }
                        </div>
                    </div>
                </div>
                {/* Create New Post Button*/}
                <Mybutton disabled={isUploading} content="Create Post" pxDefault="px-2" pyDefault="py-2" onClick={handleSubmit} />
            </div>
        </CardLayout>
        </SectionLayout>
    );
}
