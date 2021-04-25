import React, { useContext, useState, useEffect } from 'react'
import useForm from '@/hooks/useForm'
import Input from '@/components/Input/Input'
import FileUpload from '@/components/FileUpload/FileUpload'
import Button from '@/components/Button/Button'
import { ErrorContext } from '@/components/Error/Error'
import useApi from '@/hooks/useApi'

export default () => {
  const [commandName, setCommandName] = useState('hello')
  const [step, setStep] = useState('register')
  const setErrorToasts = useContext(ErrorContext)
  const makeRequest = useApi()

  const {
    watch,
    reset,
    errors,
    disabled,
    validateForm,
    setCustomErrors,
    form: { author, command, sound }
  } = useForm({
    author: {
      completed: false,
      error: {
        status: false,
        message: ' Un nom/pseudo est requis.'
      },
      value: ''
    },
    command: {
      completed: false,
      error: {
        status: false,
        message: 'Un nom de commande est requis.'
      },
      value: ''
    },
    sound: {
      completed: false,
      error: {
        status: false,
        message: 'Un fichier audio est requis.'
      },
      value: ''
    }
  })

  const submitHandler = async event => {
    event.preventDefault()

    const { isValid } = validateForm()

    if (isValid) {
      try {
        const { status } = await makeRequest('upload', {
          method: 'POST',
          body: new FormData(event.target)
        })

        if (status === 409) {
          return setCustomErrors(
            [{
              name: 'command',
              error: {
                status: true,
                message: 'Cette commande existe déjà.'
              },
              completed: true
            }]
          )
        }

        setCommandName(command.value)
        setStep('success')
        reset()
      } catch (error) {
        return setErrorToasts([{
          name: 'server',
          error: {
            message: 'Il y a un problème avec le serveur.'
          }
        }])
      }
    }
  }

  useEffect(() => setErrorToasts(errors), [errors])

  return (
    <>
      {step === 'register' ? (
        <>
          <h2 className="text-lg">Ajouter un son</h2>
          <form onSubmit={submitHandler}>
            <Input
              label="Ton nom/pseudo"
              placeholder="ex. Benjamin"
              name="author"
              handler={watch('author')}
              error={author.error.status}
              type="text"
            />
            <Input
              label="Nom de la commande"
              placeholder="ex. toc toc toc"
              name="command"
              className="mt-8"
              handler={watch('command')}
              error={command.error.status}
              type="text"
            />
            <FileUpload
              label="Fichier audio"
              defaultPlaceholder="Drag & drop ou clique pour téléverser le son."
              dragPlaceholder="Lâche-moi !"
              name="sound"
              className="mt-8"
              handler={watch('sound')}
              error={sound.error.status}
            />
            <Button
              className="block mx-auto mt-8"
              label="Ajouter"
              disabled={disabled}
            />
          </form>
        </>
      ) : (
        <>
          <div className="flex flex-col items-center justify-center h-full">
            <h1 className="mt-16">Le son « {commandName} » a bien été ajouté.</h1>
            <svg xmlns="http://www.w3.org/2000/svg" className="order-first w-40 h-40 text-green" fill="none">
              <circle cx="80" cy="80" r="78" stroke="currentColor" strokeWidth="3"/>
              <path stroke="currentColor" strokeWidth="3" d="M47 81l25 25 43-43"/>
            </svg>
            <Button
              className="mt-16"
              label="Ajouter un autre son"
              onClick={() => setStep('register')}
            />
          </div>
        </>
      )}
    </>
  )
}
