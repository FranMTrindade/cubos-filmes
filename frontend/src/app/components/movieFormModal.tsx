"use client";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify"; 

import { useEffect, useState } from "react";
import {
  Modal,
  Form,
  Input,
  Select,
  InputNumber,
  DatePicker,
  Upload,
  Button,
  Spin,
  Row,
  Col,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useTheme } from "@/context/themeContext";
import {
  useMovieById,
  useCreateMovie,
  useUpdateMovie,
} from "@/hooks/useMovies";
import dayjs from "dayjs";

const { Option } = Select;
const { TextArea } = Input;

interface MovieFormModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  movieId?: number;
}

export default function MovieFormModal({
  open,
  onClose,
  onSuccess,
  movieId,
}: MovieFormModalProps) {
  const { isDark } = useTheme();
  const [form] = Form.useForm();
  const [file, setFile] = useState<File | null>(null);

  const { data: movie, isLoading: fetching } = useMovieById(movieId);
  const createMovie = useCreateMovie();
  const updateMovie = useUpdateMovie();

  const genres = [
    "Ação",
    "Aventura",
    "Comédia",
    "Drama",
    "Ficção Científica",
    "Romance",
    "Terror",
  ];

  useEffect(() => {
    if (open && movie && movieId) {
      form.setFieldsValue({
        ...movie,
        releaseDate: movie.releaseDate ? dayjs(movie.releaseDate) : undefined,
      });
    } else if (open && !movieId) {
      form.resetFields();
      setFile(null);
    }
  }, [open, movie, movieId, form]);

  const handleSubmit = async (values: any) => {
    try {
      const formattedValues = {
        ...values,
        releaseDate: values.releaseDate
          ? values.releaseDate.format("YYYY-MM-DD")
          : "",
        rating: Number(values.rating),
        duration: Number(values.duration),
        budget: Number(values.budget),
        revenue: Number(values.revenue),
      };

      if (movieId) {
        // Atualiza filme existente
        await updateMovie.mutateAsync({
          id: movieId,
          data: formattedValues,
          image: file || undefined,
        });
        toast.success("Filme atualizado com sucesso!" );
      } else {
        // Cria novo filme
        await createMovie.mutateAsync({
          data: formattedValues,
          image: file || undefined,
        });
        toast.success("Filme criado com sucesso!" );
      }

      form.resetFields();
      setFile(null);
      onClose();
      onSuccess?.();
    } catch (error) {
      console.error(error);
      toast.error("Erro ao salvar o filme.");
    }
  };

  return (
    <Modal
      title={movieId ? "Editar Filme" : "Adicionar Filme"}
      open={open}
      onCancel={onClose}
      onOk={() => form.submit()}
      okText={movieId ? "Salvar Alterações" : "Adicionar"}
      confirmLoading={createMovie.isPending || updateMovie.isPending}
      width={650}
      centered
      okButtonProps={{
        className: `${
          isDark
            ? "bg-[#8E4EC6] border-none hover:!bg-[#7d3db4]"
            : "bg-[#BE93E4] border-none hover:!bg-[#a56fd8]"
        }`,
      }}
    >
      {fetching && movieId ? (
        <div className="flex justify-center items-center py-10">
          <Spin />
        </div>
      ) : (
        <Form
          layout="vertical"
          form={form}
          onFinish={handleSubmit}
          className={`${isDark ? "text-white" : "text-[#6F6D78]"}`}
        >
          <Form.Item
            label="Nome do Filme"
            name="name"
            rules={[{ required: true, message: "Informe o nome do filme" }]}
          >
            <Input placeholder="Ex: Vingadores: Ultimato" />
          </Form.Item>

          <Form.Item
            label="Descrição"
            name="description"
            rules={[{ required: true, message: "Informe a descrição" }]}
          >
            <TextArea rows={3} placeholder="Sinopse do filme..." />
          </Form.Item>

          <Form.Item
            label="Gênero"
            name="genre"
            rules={[{ required: true, message: "Selecione um gênero" }]}
          >
            <Select
              placeholder="Selecione um gênero"
              options={genres.map((g) => ({ label: g, value: g }))}
            />
          </Form.Item>
          <Form.Item
            label="Rating"
            name="rating"
            rules={[{ required: true, message: "Selecione uma nota" }]}
          >
            <Select placeholder="Nota de 1 a 10">
              {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                <Option key={num} value={num}>
                  {num}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Link do Trailer (YouTube)"
            name="trailerUrl"
            rules={[{ required: true, message: "Informe o link do trailer" }]}
          >
            <Input placeholder="https://youtube.com/watch?v=..." />
          </Form.Item>

          <Form.Item
            label="Data de Lançamento"
            name="releaseDate"
            rules={[{ required: true, message: "Informe a data de lançamento" }]}
          >
            <DatePicker className="w-full" format="YYYY-MM-DD" />
          </Form.Item>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                label="Duração (min)"
                name="duration"
                rules={[{ required: true, message: "Informe a duração" }]}
              >
                <InputNumber className="w-full" min={1} step={1} />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                label="Orçamento ($)"
                name="budget"
                rules={[{ required: true, message: "Informe o orçamento" }]}
              >
                <InputNumber className="w-full" min={0} step={1} />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                label="Receita ($)"
                name="revenue"
                rules={[{ required: true, message: "Informe a receita" }]}
              >
                <InputNumber className="w-full" min={0} step={1} />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label="Situação"
            name="status"
            rules={[{ required: true, message: "Informe o status" }]}
          >
            <Input placeholder="Ex: Lançado, Em Produção..." />
          </Form.Item>


          <Form.Item
            label="Idioma"
            name="language"
            rules={[{ required: true, message: "Informe o idioma" }]}
          >
            <Input placeholder="Ex: Português" />
          </Form.Item>

          <Form.Item
            label="Imagem do Filme"
            tooltip="Selecione o pôster do filme"
            required={!movieId}
          >
            <Upload
              beforeUpload={(file) => {
                setFile(file);
                return false;
              }}
              maxCount={1}
              accept="image/*"
            >
              <Button icon={<UploadOutlined />}>Selecionar Imagem</Button>
            </Upload>
            {file && (
              <p className="mt-2 text-sm text-gray-400">{file.name}</p>
            )}
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
}
