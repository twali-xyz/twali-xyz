import { ReactNode, useRef } from 'react'
import { InputGroup } from '@chakra-ui/react'
// import { useForm, UseFormRegisterReturn } from 'react-hook-form'
// import { FiFile } from 'react-icons/fi'

type FileUploadProps = {
//   register: any;
  handleFile: Function;
  children?: ReactNode
}

const FileUpload = (props: FileUploadProps) => {
  const { children } = props
  const inputRef = useRef<HTMLInputElement | null>(null)
  const hiddenFileInput = useRef(null);

//   const { ref, ...rest } = register as {ref: (instance: HTMLInputElement | null) => void}

const handleClick = event => {
    hiddenFileInput.current.click();
};

const handleChange = event => {
    const fileUploaded = event.target.files[0];
    props.handleFile(fileUploaded);
};

  return (
      <InputGroup onClick={handleClick}>
        <input
          type='file'
          hidden
          accept="image/*"
          ref={hiddenFileInput}
          onChange={handleChange}
        />
        <>
          {children}
        </>
      </InputGroup>
  )
}

type FormValues = {
  file_: FileList
}
export default FileUpload;


// const App = () => {
//   const { register, handleSubmit, formState: { errors } } = useForm<FormValues>()
//   const onSubmit = handleSubmit((data) => console.log('On Submit: ', data))

//   const validateFiles = (value: FileList) => {
//     if (value.length < 1) {
//       return 'Files is required'
//     }
//     for (const file of Array.from(value)) {
//       const fsMb = file.size / (1024 * 1024)
//       const MAX_FILE_SIZE = 10
//       if (fsMb > MAX_FILE_SIZE) {
//         return 'Max file size 10mb'
//       }
//     }
//     return true
//   }

//   return (
//     <>
//       <form onSubmit={onSubmit}>
//         <FormControl isInvalid={!!errors.file_} isRequired>
//           <FormLabel>{'File input'}</FormLabel>

//           <FileUpload
//             accept={'image/*'}
//             multiple
//             register={register('file_', { validate: validateFiles })}
//           >
//             <Button leftIcon={<Icon as={FiFile} />}>
//               Upload
//             </Button>
//           </FileUpload>

//           <FormErrorMessage>
//             {errors.file_ && errors?.file_.message}
//           </FormErrorMessage>
//         </FormControl>

//         <button>Submit</button>
//       </form>
//     </>
//   )
// }

