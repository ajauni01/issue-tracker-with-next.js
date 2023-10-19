'use client'
import { Button, Callout, TextField } from '@radix-ui/themes';
import { InfoCircledIcon, MagnifyingGlassIcon } from '@radix-ui/react-icons';
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useCallback, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface IssueForm{
  title: string;
  description: string;
}


const NewIssuePage = () => {
  const router = useRouter();
  const {register, control, handleSubmit} = useForm<IssueForm>();
  // console.log('register details', register('title'));
  // useState hook to handle the error
  const [error, setError] = useState("")

  return (
    <div className='max-w-xl space-y-3'>
      {/* Display the error message */}
     {error &&  <Callout.Root color="red">
    <Callout.Icon>
      <InfoCircledIcon />
    </Callout.Icon>
    <Callout.Text>
      {error}
    </Callout.Text>
  </Callout.Root>}
  
      <form  onSubmit={handleSubmit( async (data)=>{
      try {
        await axios.post('/api/issues', data);
     //  route the user to the issues page after submitting the form
    router.push('/issues') 
      } catch (error) {
        setError('An unexpected error occurred')
      }
    })}>
      <TextField.Root>
        <TextField.Slot>
          <MagnifyingGlassIcon height='16' width='16' />
        </TextField.Slot>
        <TextField.Input placeholder='Title' {...register("title")} />
      </TextField.Root>
      {/* TextArea to write the issue */}
      <Controller name="description" control={control}  render={({ field }) => <SimpleMDE placeholder='Please describe your issue' {...field} />} />
      <Button>Submit New Issue</Button>
    </form>
    </div>
  );
};

export default NewIssuePage;

// TODO: create a markdown editor for the issue description
// TODO: understand the reason of using angle brackets in the TextField component
// TODO: understand the react hook form controller component
// TODO: thoroughly understand the react hook form