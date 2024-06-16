import { get, writable, type Writable } from "svelte/store"
import { baseRoute, deletePostFromDatabase, updateOrCreatePostFromDatabase, dictionary } from "./stores";
import { goto } from "$app/navigation";
import toast from "svelte-french-toast";

export const myPosts: Writable<Post[]> = writable([])

/**
 * Function to update or create a post in a Post array.
 * @param posts - Array of Post objects.
 * @param newPost - The new Post object to be added or used to update an existing post.
*/
export function updateOrCreatePost(posts: Post[], newPost: Post): void {
    const index = posts.findIndex(post => post.id === newPost.id);

    if (index !== -1) {
        // Post exists, update the content
        posts[index] = newPost;
    } else {
        // Post does not exist, create a new one
        posts.push(newPost);
    }

    myPosts.set(posts);

    updateOrCreatePostFromDatabase(newPost)
        .catch((error) => {
            toast.error(get(dictionary).postNotSaved, { position: 'bottom-center' });
            console.error(error);

            goto(`${baseRoute}/create?entryID=${newPost.id}`);
        })
}

/**
 * Function to delete a post in a Post array.
 * @param posts - Array of Post objects.
 * @param id - The ID of the Post to be deleted.
*/
export function deletePostById(posts: Post[], postId: string): void {
    const index = posts.findIndex(post => post.id === postId);

    if (index !== -1) {
        const [deletedPost] = posts.splice(index, 1);
        myPosts.set(posts);

        deletePostFromDatabase(postId)
            .catch((error) => {
                // Error occurred, re-add the post to the array
                posts.splice(index, 0, deletedPost);
                myPosts.set(posts);

                toast.error(get(dictionary).errorDeletingPost, { position: 'bottom-center' });
                console.error(error);
            });
    }
}

/**
 * Function to get a post in a Post array.
 * @param posts - Array of Post objects.
 * @param id - The ID of the Post to be retrieved.
*/
export function getPostById(posts: Post[], id: string): Post | undefined {
    return posts.find(post => post.id === id);
}


/**
 * Function to generate a unique ID, making sure it's not already in a Post array.
 * @param posts - Array of Post objects.
*/
export function generateUniqueId(posts: Post[]): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const idLength = 10;

    function generateId(): string {
        let id = '';
        for (let i = 0; i < idLength; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            id += characters[randomIndex];
        }
        return id;
    }

    let newId = generateId();

    while (posts.some(post => post.id === newId)) {
        newId = generateId();
    }

    return newId;
}

export interface Post {
    id: string
    authorId: string
    isAnonymous: boolean
    publishedDate: number
    date: number
    location?: string
    title: string
    content: string
    media: Media[]
    visibility: Visibility
    isLocked: boolean
    categoryID: number
    hashtags: string[]
    isDraft: boolean
    likes: number
}

interface Image {
    type: 'image'
    src: string
    caption?: string
    alt: string
    height?: number
    width?: number
}

interface Video {
    type: 'video'
    src: string
    caption?: string
    alt: string
    height?: number
    width?: number
}

export type Media = Image | Video

type VisibilityType = 'private' | 'public'
type SpecialUsers = 'Are the only ones that can view the post' | 'Cannot view the post'

export interface Visibility {
    type: VisibilityType
    specialUsers?: SpecialUsers
    specialUsersIDs?: number[]
}