import { createUploadthing, type FileRouter } from 'uploadthing/next'
import { AuthProvider } from '@/components/providers/Provider'


const f = createUploadthing()

const auth = (req: Request) => ({ id: AuthProvider}) // Fake auth function

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  profilePicture: f(['image'])
    .middleware(({ req }) => auth(req))
    .onUploadComplete((data) => console.log('file', data)),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter
