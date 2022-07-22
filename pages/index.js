import Head from 'next/head'
import styles from '../styles/Home.module.css'
import React, { useState } from 'react';
import { 
  useColorMode, 
  Button, 
  Flex, 
  Divider,
  Input,
  FormControl,
  FormLabel,
  Box
} from '@chakra-ui/react'
import InputMask from "react-input-mask";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FiSun, FiMoon } from "react-icons/fi";

export default function Home() {
  const { colorMode, toggleColorMode } = useColorMode()
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = event => {
    event.preventDefault();
    setSubmitted(false)

    if(submitted){
      toast.success('Cadastro realizado com sucesso!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: colorMode = 'dark' ? 'dark' : 'light',
      });
    }else{
      toast.error('Erro ao realizar o cadastro!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

    let data = {
      name,
      phone,
      email,
      password
    }

    fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then((res) => {
      // if (res.status === 200) {
        setSubmitted(true)
        setName('')
        setPhone('')
        setEmail('')
        setPassword('')
      // }
    }).catch(err => {
      
      setSubmitted(true)
      setName('')
      setPhone('')
      setEmail('')
      setPassword('')
    });
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>Overmind Challenge</title>
        <meta name="description" content="Created by Vinicius Vibrich" />
        <link rel="icon" href="/favicon.png" />
      </Head>

        <Flex direction="row" justifyContent="flex-end">
          <header width="200px">
              <Button onClick={toggleColorMode} marginTop="10px">
                {colorMode === 'light' ?
                  <FiMoon /> : <FiSun />}
              </Button>
          </header>
        </Flex>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Bem-vindo(a) a <a href="https://www.overmind.ai/">Overmind</a>
        </h1>
        <Divider />
        <h2 className={styles.description}>
          Cadastre-se
        </h2>
        <Box p={8} maxWidth="500px" borderWidth={1} borderRadius={8} boxShadow="lg">
          <form onSubmit={handleSubmit}>
            <div className={styles.form}>
              <FormControl className={styles.control} isRequired>
                <FormLabel>Nome Completo</FormLabel>
                <Input 
                  type="text" 
                  placeholder="Ex: Joe Doe" 
                  onChange={event => setName(event.currentTarget.value)}
                />
              </FormControl>
              <FormControl className={styles.control} isRequired>
                <FormLabel>Email</FormLabel>
                <Input 
                  type="email" 
                  placeholder="Ex: joedoe@myprovider.com" 
                  onChange={event => setEmail(event.currentTarget.value)}
                />
              </FormControl>
              <FormControl className={styles.control} isRequired>
                <FormLabel>Telefone</FormLabel>
                <Input 
                  as={InputMask} 
                  mask="(**)*****-****" 
                  maskChar={null}
                  type="phone" 
                  placeholder="Ex: (99)99999-9999" 
                  onChange={event => setPhone(event.currentTarget.value)}
                />
              </FormControl>
              <FormControl className={styles.control} isRequired>
                <FormLabel>Senha</FormLabel>
                <Input 
                  type="password" 
                  placeholder="**********" 
                  onChange={event => setPassword(event.currentTarget.value)}  
                />
              </FormControl>
              <Button type="submit" variantColor="teal" size="lg" marginTop="10px">
                Cadastrar
              </Button>
              <ToastContainer 
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme={colorMode === 'light' ? 'light' : 'dark'}
              />
            </div>
          </form>
        </Box>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vibrich.me/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by Vinicius Vibrich 
        </a>
      </footer>
    </div>
  )
}
