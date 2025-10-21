"use client";

import { Form, Input, Button, Typography, Tabs } from "antd";
import { useState } from "react";
import back from "@/public/back.png";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { authService } from "@/services/auth";
import { useAuth } from "@/context/authContext";
import {  toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css";

const { Link } = Typography;

export default function AuthPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { login } = useAuth();

  const handleLogin = async (values: { email: string; password: string }) => {
    try {
      setLoading(true);
      await login(values.email, values.password);
    } catch (error: any) {
      const description = error?.response?.data?.message || "Erro ao fazer login";
      toast.error("Falha no login: " + description[0]);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (values: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    if (values.password !== values.confirmPassword) {
      console.log("error");
      return toast.error("As senhas não coincidem"); 
    }

    try {
      setLoading(true);
      await authService.register({
        name: values.name,
        email: values.email,
        password: values.password,
      });

      toast.success( "Cadastro realizado com sucesso!" );
     await login(values.email, values.password);
    } catch (error: any) {
      const description = error?.response?.data?.message || "Erro ao cadastrar";
      toast.error(description[0]); 
    } finally {
      setLoading(false);
    }
  };

  const tabItems = [
    {
      key: "login",
      label: "Login",
      children: (
        <Form
          layout="vertical"
          onFinish={handleLogin}
          requiredMark={false}
          className="flex flex-col gap-2"
        >
          <Form.Item
            label={<span className="text-white">Nome</span>}
            name="email"
            rules={[{ required: true, message: "Digite seu nome ou e-mail" }]}
          >
            <Input
              placeholder="Digite seu E-mail"
              className="bg-[#121214] border-none text-white placeholder:text-[#6F6D78]"
              size="large"
            />
          </Form.Item>

          <Form.Item
            label={<span className="text-white">Senha</span>}
            name="password"
            rules={[{ required: true, message: "Digite sua senha" }]}
          >
            <Input.Password
              placeholder="Digite sua senha"
              className="bg-[#121214] border-none text-white placeholder:text-[#6F6D78]"
              size="large"
            />
          </Form.Item>

          <div className="flex justify-between items-center mt-2">
            <Link
              href="#"
              style={{ color: "#8E4EC6" }}
              className="text-sm hover:underline"
            >
              Esqueci minha senha
            </Link>
            <Button htmlType="submit" type="primary" loading={loading} size="large">
              Entrar
            </Button>
          </div>
        </Form>
      ),
    },
    {
      key: "register",
      label: "Cadastrar",
      children: (
        <Form
          layout="vertical"
          onFinish={handleRegister}
          requiredMark={false}
          className="flex flex-col gap-2"
        >
          <Form.Item
            label={<span className="text-white">Nome</span>}
            name="name"
            rules={[{ required: true, message: "Digite seu nome" }]}
          >
            <Input
              placeholder="Digite seu nome"
              className="bg-[#121214] border-none text-white placeholder:text-[#6F6D78]"
              size="large"
            />
          </Form.Item>

          <Form.Item
            label={<span className="text-white">E-mail</span>}
            name="email"
            rules={[
              { required: true, message: "Digite seu e-mail" },
              { type: "email", message: "E-mail inválido" },
            ]}
          >
            <Input
              placeholder="Digite seu e-mail"
              className="bg-[#121214] border-none text-white placeholder:text-[#6F6D78]"
              size="large"
            />
          </Form.Item>

          <Form.Item
            label={<span className="text-white">Senha</span>}
            name="password"
            rules={[{ required: true, message: "Digite uma senha" }]}
          >
            <Input.Password
              placeholder="Digite sua senha"
              className="bg-[#121214] border-none text-white placeholder:text-[#6F6D78]"
              size="large"
            />
          </Form.Item>

          <Form.Item
            label={<span className="text-white">Confirmar senha</span>}
            name="confirmPassword"
            rules={[{ required: true, message: "Confirme sua senha" }]}
          >
            <Input.Password
              placeholder="Confirme sua senha"
              className="bg-[#121214] border-none text-white placeholder:text-[#6F6D78]"
              size="large"
            />
          </Form.Item>

          <div className="flex justify-end">
            <Button htmlType="submit" type="primary" loading={loading} size="large">
              Cadastrar
            </Button>
          </div>
        </Form>
      ),
    },
  ];

  return (
    <div className="relative flex h-screen w-full items-center justify-center bg-black">
      <Image
        src={back}
        alt="Cinema background"
        fill
        className="object-cover opacity-60"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-transparent"></div>

      <div className="relative z-10 flex flex-col justify-center w-[412px] rounded-xl bg-[#1E1E1E] p-6 shadow-lg sm:w-[90%] max-w-sm">
        <Tabs
          defaultActiveKey="login"
          items={tabItems}
          centered
          className="[&_.ant-tabs-tab-btn]:text-white [&_.ant-tabs-ink-bar]:bg-[#8E4EC6]"
        />
      </div>
    </div>
  );
}
