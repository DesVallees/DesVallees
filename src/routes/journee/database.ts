import { writable, type Writable } from "svelte/store"

export const myPosts: Writable<Post[]> = writable([])

/**
 * Function to update or create a post in the array.
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
}

export interface Post {
    id: number
    authorId: string
    isAnonymous: boolean
    publishedDate: number
    date: number
    location?: string
    title: string
    content: PostContent[]
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

type ListItem = 'ordered' | 'unordered'

interface PostText {
    type: 'text'
    content: string
    listItemType?: ListItem
}

export type PostContent =  PostText | Image | Video

type VisibilityType = 'private' | 'public'
type SpecialUsers = 'Are the only ones that can view the post' | 'Cannot view the post'

export interface Visibility {
    type: VisibilityType
    specialUsers?: SpecialUsers
    specialUsersIDs?: number[]
}