'use client'

import { useForm } from 'react-hook-form'
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

const FormSchema = z.object({
  SkillName: z.string().min(1, 'Skill Name is required').max(100),
  description: z.string().min(1, '10 words description is minimum').max(150),
})

const PostReq = () => {
  const router = useRouter()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      SkillName: '',
      description: '',
    },
  })

  const onSubmit1 = async (values: z.infer<typeof FormSchema>) => {
    console.log('Form Data:', values)
    try {
      const response = await fetch('/api/PostReq', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          SkillName: values.SkillName,
          description: values.description,
        }),
      })
      if (response.ok) {
        router.refresh()
        router.push('/request')
      } else {
        console.error('Entry failed')
      }
    } catch (error) {
      console.error('Error during form submission:', error)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit1)} className="w-full">
        <div>
          <FormField
            control={form.control}
            name="SkillName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Skill Name</FormLabel>
                <FormControl>
                  <Input placeholder="Photography" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Write about What u want to learn" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex mr-10">
          <Button
            className="w-full mt-4 bg-black mr-2 text-white"
            type="submit"
            variant={'secondary'}
          >
            Post a request
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default PostReq
