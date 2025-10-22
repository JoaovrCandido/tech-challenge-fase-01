import type { Meta, StoryObj } from '@storybook/nextjs';
import React from 'react'; // Importe o React

// 1. Importe o Provider E o Hook
import {
  AccessibilityProvider,
  useAccessibility,
} from '@/contexts/AccessibilityProvider'; // Ajuste o caminho se necessário

// 2. Importe o componente "burro" E suas props
import Header, { type HeaderProps } from './Header'; // Assumindo que você exportou a interface

// --- Configuração Geral (Meta) ---
const meta = {
  title: 'Components/Home/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  
  // 3. Adiciona o Decorator (igual)
  decorators: [
    (Story) => (
      <AccessibilityProvider>
        <Story />
      </AccessibilityProvider>
    ),
  ],

  // 4. Args padrão (igual)
  args: {
    title: 'Banco FIAP',
  },
  
  // 5. argTypes (igual)
  argTypes: {
    title: {
      description: 'O título principal exibido no cabeçalho',
      control: 'text',
    },
    // As props onToggle... não são listadas aqui,
    // pois não são controláveis pelo usuário (vêm do contexto).
  },
  // 6. Define o 'meta' satisfazendo o tipo do Header
} satisfies Meta<typeof Header>;

export default meta;

// --- Definição do Tipo da Story ---
// O tipo da Story é baseado nas props do Header
type Story = StoryObj<typeof Header>;

// --- Componente de Conexão (Hook) ---

// 7. CORREÇÃO (Erro 1):
// Recebemos 'args' que é um 'Partial<HeaderProps>' (tudo opcional)
const HeaderWithContext = (args: Partial<HeaderProps>) => {
  // Pega as funções REAIS do contexto
  const { toggleDarkMode, toggleChangeFontSize } = useAccessibility();

  // Garante que 'title' seja uma 'string' antes de passar para o Header.
  // Usamos o 'args.title' se ele existir, ou um fallback.
  const title = args.title || 'Título Padrão (Fallback)';

  return (
    <Header
      // Passamos a 'string' garantida
      title={title} 
      // Passamos as funções REAIS
      onToggleDarkMode={toggleDarkMode}
      onToggleFontSize={toggleChangeFontSize}
    />
  );
};

// --- Nossas Stories (Variações do Componente) ---

/**
 * Esta story agora está "viva". Os botões de tema e fonte
 * vão funcionar de verdade.
 */
export const Funcional: Story = {
  // 8. CORREÇÃO (Erro 2):
  // Adicionamos a propriedade 'args' (mesmo vazia)
  // para satisfazer o tipo do Storybook.
  args: {
    // Vazio, pois vai usar o 'title' dos 'meta.args'
  },
  
  // A função render agora recebe os 'args' mesclados
  render: (args) => <HeaderWithContext {...args} />,
};