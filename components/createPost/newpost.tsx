'use client';
// UI
import { Mybutton } from '@/components/common/button';
import FeaturedToggle from '@/components/createPost/toggle'
import TagInput from '@/components/createPost/tagInput';
import { toast } from 'react-hot-toast';
// UX
import dynamic from 'next/dynamic';
import rehypeSanitize from "rehype-sanitize";
import { useState } from 'react';
import { useTheme } from 'next-themes';
// Markdown Content Editor
const MDEditor = dynamic(() => import("@uiw/react-md-editor"), {
  ssr: false,
  loading: () => <p>Loading editor...</p>,
});
// Client Session
import {useSession} from 'next-auth/react';
// Next Router
import { useRouter } from 'next/navigation';


export default function CreatePost() {
   // Md editor Dark Mode
    const { theme } = useTheme();
    // Get current session
    const { data: currentSession } = useSession();
    // Instantiate Router
    const router = useRouter();
    // Variable to store title 
    const [title, setTitle] = useState('');
    // Variable to store content
    const [content, setContent] = useState<string | undefined>('');
    // Variable to store tags
    const [tags, setTags] = useState<string[]>([]);
    // Variable to store isFeatured
    const [isFeatured, setIsFeatured] = useState(false);
    // Variable to store Thumbnail URL
    const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
    // Variable to store isUploading
    const [isUploading, setIsUploading] = useState(false);
    // Variable to store contentUploading
    const [contentIsUploading, setContentIsUploading] = useState(false);
    // Variable to store isLoading
    const [isLoading, setIsLoading] = useState(false);

    // Drop image in post content function
    const HandleContentImgDrop = async (event: React.DragEvent) => {
        // If still uploading, return (let the current upload finish)
        if (contentIsUploading) return;
        // Update isUploading variable to true
        setContentIsUploading(true);

        // Disables default event that redirects to image url
        event.preventDefault();

        // Begin Upload

        // Grab first file that was dropped during a drag-and-drop event and save to file
        const file = event.dataTransfer.files[0];

         // Uploading Condition: if no file or not an image format: reset isUploading and return
        if (!file || !file.type.startsWith('image/')) {
            setContentIsUploading(false);
            return;
        }

        // Create a new form payload
        const formData = new FormData();
        // Append file image to formdata payload 
        formData.append('image', file);

        // fetch upload API POST request
        const res = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
        });

        // Get url api response
        const { url } = await res.json();
        // Set image markdown format and save to markdown
        const markdown = `![Image](${url})`;

        // Update Content variable
        setContent((prev) => (prev ?? '') + '\n' + markdown);
        // Update isUploading variable to false (Done Uploading)
        setContentIsUploading(false);
    };

    // Drop image in thumbnail section function
    const HandleThumbnailImgDrop = async (e: React.DragEvent) => {
        // If still uploading, return (let the current upload finish)
        if (isUploading) return;
        // Update isUploading variable to true
        setIsUploading(true);

        // Disables default event that redirects to image url
        e.preventDefault();

        // Begin Upload

        // Grab first file that was dropped during a drag-and-drop event
        const file = e.dataTransfer.files[0];
        
        // Uploading Condition: if no file or not an image format: reset isUploading and return
        if (!file || !file.type.startsWith('image/')) {
            setIsUploading(false);
            return;
        }

        // Create a new form payload
        const formData = new FormData();
        // Append file image to formdata payload 
        formData.append('image', file);

        // fetch upload API POST request
        const res = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
        });

        // Get url api response
        const { url } = await res.json();

        // Update Thumbnail URL variable
        setThumbnailUrl(url);
        // Update isUploading variable to false (Done Uploading)
        setIsUploading(false);
    };

    // Upload image in thumbnail section function
    const HandleThumbnailImgUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        // If still uploading, return (let the current upload finish)
        if (isUploading) return;
        // Update isUploading variable to true
        setIsUploading(true);

        // Begin Upload

        // Grab first file that was uploaded in Files
        const file = e.target.files?.[0];
        
        // Uploading Condition: if no file or not an image format: reset isUploading and return
        if (!file || !file.type.startsWith('image/')) {
            setIsUploading(false);
            return;
        }

        // Create a new form payload
        const formData = new FormData();
        // Append file image to formdata payload 
        formData.append('image', file);

        // fetch upload API POST request
        const res = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
        });

        // Get url api response
        const { url } = await res.json();

        // Update Thumbnail URL variable
        setThumbnailUrl(url);
        // Update isUploading variable to false (Done Uploading)
        setIsUploading(false);
    };

    // Submit Post function
    const handleSubmit = async () => {
        // If still loading, return (let the current load finish)
        if (isLoading) return;

        // If not logged in, return
        if (!currentSession?.user?.id) {
            toast.error('You must be logged in to create a post');
            return;
        }
        // If not Admin, return
        // if (!currentSession?.user?.isAdmin) {
        //     toast.error(`User "${currentSession?.user?.name}" does not have admin access. Please request access to create a post.`);
        //     return;
        // }
        
        // Validate input
        if (!title || !content || !thumbnailUrl) {
            toast.error('Title, content, and thumbnail are required');
            return;
        }

        setIsLoading(true);

        // Fetch create-post API POST request
        const res = await fetch('/api/create-post', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
            title,
            content,
            thumbnailUrl,
            isFeatured,
            tags
            }),
        });
        
        // If response is ok, get JSON response and redirect to the post
        if (res.ok) {
            const result = await res.json();
            await fetch('/api/revalidate', { method: 'POST' });
            toast.success('Post created successfully!');
            setIsLoading(false);
            router.push(`/post/${result.slug}`);  
        } else {
            const errorText = await res.text();
            toast.error(`Failed to create post: ${errorText}`);
            setIsLoading(false);
            return
        } 
    };

    const showRequestAccessToast = () => {
        // If not logged in, return
        if (!currentSession?.user?.id) {
            toast.error('You must be logged in to request access');
            return;
        }
        // If isAdmin, return
        // if (currentSession?.user?.isAdmin) {
        //     toast.error('Admin access is already granted.');
        //     return;
        // }

        if (typeof window !== 'undefined' && localStorage.getItem('requestedAdminAccess')) {
            toast.error('You’ve already requested admin access. Please wait for approval.');
            return;
        }

        toast((t) => (
            <div className="flex flex-col gap-2">
                <span className="text-sm">
                    User: &quot;{currentSession?.user?.name}&quot; doesn&quot;t have admin access. Would you like to request it?
                </span>
                <div className="flex gap-2 justify-end">
                    <button
                    onClick={() => {
                        toast.dismiss(t.id); 
                        handleRequestAccess();
                    }}
                    className="px-3 py-1 text-sm bg-black text-white rounded hover:bg-neutral-700 cursor-pointer"
                    >
                    Request Access
                    </button>
                    <button
                    onClick={() => toast.dismiss(t.id)}
                    className="px-3 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300 cursor-pointer"
                    >
                    Cancel
                    </button>
                </div>
            </div>
        ), {
            duration: 10000,
            position: "top-center",
        });
    };

    const handleRequestAccess = async () => {
        const res = await fetch("/api/request-access", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        });

        if (res.ok) {
            localStorage.setItem('requestedAdminAccess', 'true');
            toast.success("Access request submitted!");
        } else {
            const { error } = await res.json();
            toast.error(error || "Something went wrong.");
        }
    };

    return (
            <div className="flex flex-col px-4 py-2">
                {/* Page Title & Request Access Button*/}
                <div className="flex justify-between items-center">
                    <h1 className="font-serif font-semibold text-lg md:text-3xl">
                        Create a New Post
                    </h1>
                    <Mybutton onClick={showRequestAccessToast} iconName="ShieldUser" iconPos="left" hidden="content" content="Request Access" pxDefault="px-2" pxLg="lg:px-4" pyDefault="py-1.5"/>
                </div>
                
                {/* Form */}
                <div className="my-10 space-y-6">
                    {/* Title */}
                    <div className="flex flex-col space-y-1">
                        <h2 className="font-serif font-medium text-lg">Title</h2>
                        <input className="text-sm md:text-md lg:text-lg xl:text-lg w-full flex-grow rounded-sm bg-gray-100 dark:bg-black dark:placeholder:text-white px-2 py-0.5 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300 outline-1"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter Title"/>
                    </div>
                    {/* Content */}
                    <div className="flex flex-col space-y-1">
                        <h2 className="font-serif font-medium text-lg">Content (Markdown)</h2>
                        <div className="relative bg-gray-100 rounded-sm p-2" data-color-mode={theme === 'dark' ? 'dark' : 'light'} onDragOver={(e) => e.preventDefault()} onDrop={HandleContentImgDrop}>
                            <MDEditor value={content} onChange={setContent} preview="edit" height={600} textareaProps={{placeholder: 'Enter Markdown text...'}} previewOptions={{rehypePlugins: [[rehypeSanitize]]}}
                                className="custom-md-editor prose prose-neutral max-w-none"/>
                            {/* Loading Spinner */}
                            {contentIsUploading && (
                                <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center z-10 rounded-md">
                                    <div className="flex items-center space-x-2">
                                        <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-gray-600" />
                                        <span className="text-gray-700 text-sm font-medium">Uploading image...</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    {/* Tags */}
                    <TagInput tags={tags} setTags={setTags} />
                    {/* Toggle isFeatured */}
                    <FeaturedToggle isFeatured={isFeatured} onToggle={() => setIsFeatured((prev) => !prev)}/>
                    {/* Thumbnail */}
                    <div className="flex flex-col space-y-1">
                        <h2 className="font-serif font-medium text-lg">Thumbnail (Required)</h2>
                        <div onDrop={HandleThumbnailImgDrop} onDragOver={(e) => e.preventDefault()} className="relative border-2 border-dashed border-gray-300 rounded-sm bg-gray-50 dark:bg-black p-4 flex flex-col items-center justify-center text-center hover:border-gray-400 transition">
                            {/* Loading Spinner */}
                            {isUploading && (
                                <div className="absolute inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-10 rounded-sm">
                                    <div className="flex items-center space-x-2">
                                        <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-black dark:border-white" />
                                        <span className="text-sm font-medium">Uploading...</span>
                                    </div>
                                </div>
                            )}     
                            {thumbnailUrl ? (
                                    <>
                                        <img src={thumbnailUrl} alt="Thumbnail preview" className="max-h-64 rounded-md" />
                                        <button onClick={() => setThumbnailUrl(null)} className="mt-2 text-sm text-red-500 hover:underline cursor-pointer">Remove thumbnail</button>
                                    </>
                                    ) : 
                                    (
                                        <>
                                            <p className="text-sm text-gray-500 dark:text-white mb-2">Drag & drop your thumbnail here, or click to upload <br/>  Max image size: 10 MB</p>
                                            <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={HandleThumbnailImgUpload}/>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400 dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h10a4 4 0 004-4M7 10l5-5m0 0l5 5m-5-5v12" />
                                            </svg>
                                        </>  
                                    )
                            }
                        </div>
                    </div>
                </div>
                {/* Create New Post Button*/}               
                <Mybutton disabled={isUploading} content="Create Post" loading={isLoading} pxDefault="px-2" pyDefault="py-2" onClick={handleSubmit} />
            </div>
    );
}
