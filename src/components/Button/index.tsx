import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import { useTheme } from 'styled-components';
import { Load } from '../Load';

import {
  Container,
  Title,
} from './styles';

interface ButtonProps extends RectButtonProps {
  title: string;
  color?: string;
  loading?: boolean;
  light?: boolean;
}

export function Button({
  title,
  color,
  onPress,
  enabled = true,
  loading = false,
  light = false
}: ButtonProps) {
  const theme = useTheme();

  return (
    <Container 
      enabled={enabled} 
      onPress={onPress} 
      color={color ? color : theme.colors.main}
      style={{ opacity: (enabled === false || loading === true) ? .5 : 1 }}
    >
      { loading ? (
        <Load />
      ) : (
        <Title light={light}>{title}</Title>
      )}
      
      
    </Container>
  );
}