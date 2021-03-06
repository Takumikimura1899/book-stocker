import React, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { useDropzone } from 'react-dropzone';

const thumbsContainer = {
  display: 'flex',
  marginTop: 16,
};

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden',
};

const img = {
  display: 'block',
  width: 'auto',
  height: '100%',
};

type MyFile = File & {
  preview: string;
};
export const ImageDropDown = ({
  onChange,
  setValue,
}: {
  onChange?: (...event: any[]) => void;
  setValue: any;
}) => {
  const [files, setFiles] = useState<MyFile[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      // Do something with the files
      console.log({ acceptedFiles });
      const acceptedFile = acceptedFiles[0];

      setValue('image', acceptedFile);

      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
    [setValue]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const thumbs = files.map((file) => (
    <div className='p-2 ' key={file.name}>
      <div>
        <Image src={file.preview} alt='image' width={150} height={150} />
      </div>
    </div>
  ));

  return (
    <section className=''>
      <div className='h-full rounded-xl bg-teal-200' {...getRootProps()}>
        <input {...getInputProps({ onChange })} />
        <p>画像</p>
        {isDragActive ? <p>Drop the files here ...</p> : <p>Done</p>}
        <aside style={thumbsContainer}>{thumbs}</aside>
      </div>
    </section>
  );
};
