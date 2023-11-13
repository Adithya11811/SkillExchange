'use client'

import { useForm } from 'react-hook-form'
import { useState } from 'react'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
// import { FileUpload } from '@/components/form/fileupload'

const FormSchema = z.object({
  RealName: z.string().min(1, 'Name is required').max(100),
//   profilePhoto: z.string().min(1, 'Photo is required'),
  contacts: z.string().min(1, 'Phone is required').max(12),
  Bio: z.string().min(1, '10 words bio is minimum').max(150),
  birthDate: z.string(),
})

const CreateProfile = () => {
  const router = useRouter()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      RealName: '',
    //   profilePhoto: '',
      contacts: '',
      Bio: '',
      birthDate: '',
    },
  })
  const [thumbnailUrl, setThumbnailUrl] = useState('')

  const onSubmit1 = async (values: z.infer<typeof FormSchema>) => {
    const formData = {
      ...values,
      profilePhoto: thumbnailUrl,
    }

    // Use formData in your form submission logic
    console.log('Form Data:', formData)
    // try {
    //   const response = await fetch('/api/profile', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       RealName: values.RealName,
    //       profilePhoto: values.profilePhoto,
    //       contacts: values.contacts,
    //       Bio: values.Bio,
    //       birthDate: values.birthDate,
    //     }),
    //   });
    //   if (response.ok) {
    //     router.push('/')
    //   } else {
    //     console.error('Entry failed')
    //   }
    // } catch (error) {
    //   console.error('Error during form submission:', error)
    // }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit1)} className="w-full">
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="RealName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Johnathon Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="contacts"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contacts</FormLabel>
                <FormControl>
                  <Input placeholder="phone number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="Bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea placeholder="Write about yourself" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* <FormField
            control={form.control}
            name="profilePhoto"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <FileUpload onThumbnailUrlChange={setThumbnailUrl} />
                </FormControl>
              </FormItem>
            )}
          /> */}
          <FormField
            control={form.control}
            name="birthDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date of Birth</FormLabel>
                <div className="flex">
                  <FormControl>
                    <Input placeholder="yyyymmdd" {...field} />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button className="w-full mt-4 bg-black text-white" type="submit">
          Create Profile
        </Button>
      </form>
    </Form>
  )
}

export default CreateProfile
