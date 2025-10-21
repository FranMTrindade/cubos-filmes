"use client";

import { useState, useEffect } from "react";
import {
  Input,
  Button,
  Modal,
  DatePicker,
  Select,
  Space,
} from "antd";
import {
  SearchOutlined,
  FilterOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useTheme } from "@/context/themeContext";

const { RangePicker } = DatePicker;
const { Option } = Select;

interface FilterParams {
  name?: string;
  period?: [string, string];
  genres?: string[];
}

interface MoviesControlProps {
  onFilterChange: (filters: FilterParams) => void;
  onAddMovie?: () => void;
}

export default function MoviesControl({
  onFilterChange,
  onAddMovie,
}: MoviesControlProps) {
  const { isDark } = useTheme();
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<FilterParams>({});

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Aplica busca imediata
  const handleSearch = (value: string) => {
    setSearch(value);
    onFilterChange({ ...filters, name: value });
  };

  //  Aplica filtros e fecha modal
  const handleApplyFilters = () => {
    onFilterChange({ ...filters, name: search });
    setOpen(false);
  };

  // Resetar filtros
  const handleReset = () => {
    setFilters({});
    onFilterChange({ name: search });
  };

  return (
    <div
      className={`flex flex-col sm:flex-row items-center justify-between w-full gap-3 mb-6 transition-colors duration-300 ${
        isDark ? "text-white" : "text-[#6F6D78]"
      }`}
    >
      {!isMobile && (
        <Input
          size="large"
          placeholder="Pesquise por filmes"
          prefix={<SearchOutlined />}
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          className={`max-w-[500px] rounded-md transition-all ${
            isDark
              ? "bg-[#1E1E1E] text-white placeholder:text-[#A1A1AA] border border-[#2B2B2B]"
              : "bg-[#F8F8F8] text-[#6F6D78] placeholder:text-[#9E9E9E] border border-[#E0E0E0]"
          }`}
        />
      )}

      <Space>
        <Button
          icon={<FilterOutlined />}
          size="large"
          onClick={() => setOpen(true)}
          className={`rounded-md border-none font-medium px-5 ${
            isDark
              ? "bg-[#2A2433] text-white hover:bg-[#3A3144]"
              : "bg-[#E9DFF5] text-[#6F6D78] hover:bg-[#D7C7EC]"
          }`}
        >
          Filtros
        </Button>

        <Button
          type="primary"
          size="large"
          icon={<PlusOutlined />}
          onClick={onAddMovie}
          className={`rounded-md border-none font-medium px-5 ${
            isDark
              ? "bg-[#8E4EC6] hover:!bg-[#7d3db4]"
              : "bg-[#BE93E4] hover:!bg-[#a56fd8] text-[#F7F7F7]"
          }`}
        >
          Adicionar Filme
        </Button>
      </Space>

      <Modal
        title="Filtros de Filmes"
        open={open}
        onCancel={() => setOpen(false)}
        onOk={handleApplyFilters}
        okText="Aplicar"
        cancelText="Cancelar"
        centered
        okButtonProps={{
          className: `${
            isDark
              ? "bg-[#8E4EC6] border-none hover:!bg-[#7d3db4]"
              : "bg-[#BE93E4] border-none hover:!bg-[#a56fd8]"
          }`,
        }}
      >
        <div className="flex flex-col gap-4">
          {isMobile && (
            <div>
              <p className={`text-sm mb-1 ${isDark ? "text-white" : "text-[#6F6D78]"}`}>
                Buscar por nome:
              </p>
              <Input
                size="large"
                placeholder="Pesquise por filmes"
                prefix={<SearchOutlined />}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={`rounded-md ${
                  isDark
                    ? "bg-[#1E1E1E] text-white placeholder:text-[#A1A1AA] border border-[#2B2B2B]"
                    : "bg-[#F8F8F8] text-[#6F6D78] placeholder:text-[#9E9E9E] border border-[#E0E0E0]"
                }`}
              />
            </div>
          )}

          <div>
            <p className={`text-sm mb-1 ${isDark ? "text-white" : "text-[#6F6D78]"}`}>
              Período de lançamento:
            </p>
            <RangePicker
              className={`w-full ${
                isDark
                  ? "bg-[#1E1E1E] border-[#2B2B2B] text-white"
                  : "bg-white border-[#E0E0E0]"
              }`}
              onChange={(dates, dateStrings) =>
                setFilters((prev) => ({
                  ...prev,
                  period: dateStrings as [string, string],
                }))
              }
            />
          </div>

          <div>
            <p className={`text-sm mb-1 ${isDark ? "text-white" : "text-[#6F6D78]"}`}>
              Gêneros:
            </p>
            <Select
              mode="multiple"
              placeholder="Selecione os gêneros"
              className="w-full"
              onChange={(values) =>
                setFilters((prev) => ({ ...prev, genres: values }))
              }
              options={[
                { value: "Ação", label: "Ação" },
                { value: "Aventura", label: "Aventura" },
                { value: "Comédia", label: "Comédia" },
                { value: "Drama", label: "Drama" },
                { value: "Ficção Científica", label: "Ficção Científica" },
                { value: "Romance", label: "Romance" },
                { value: "Terror", label: "Terror" },
              ]}
            />
          </div>

          <Button
            onClick={handleReset}
            className={`w-full mt-2 ${
              isDark
                ? "bg-[#2A2433] text-white hover:bg-[#3A3144]"
                : "bg-[#E9DFF5] text-[#6F6D78] hover:bg-[#D7C7EC]"
            }`}
          >
            Limpar filtros
          </Button>
        </div>
      </Modal>
    </div>
  );
}
