import React, { useState } from 'react';
import { 
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert
 } from 'react-native';

import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from 'styled-components';

import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import { PasswordInput } from '../../../components/PasswordInput';
import { Button } from '../../../components/Button';

import { api } from '../../../services/api';

import {
  Container,
  Header,
  Steps,
  Title,
  Subtitle,
  Form,
  FormTitle,
} from './styles';


interface Params {
  user: {
    name: string; 
    email: string; 
    driverLicense: string;
  }
}

export function SignUpSecondStep() {
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');


  const theme = useTheme();
  const navigation = useNavigation();
  const route = useRoute();

  const { user } = route.params as Params;

  function handleBack() {
    navigation.goBack();
  }

  async function handleRegister() {
    if (!password || !passwordConfirm) {
      return Alert.alert('Informe a senha e a confirmação.');
    }

    if (password !== passwordConfirm) {
      return Alert.alert('As senhas não são iguais');
    }

    await api.post('/users', {
      name: user.name,
      email: user.email,
      drive_license: user.driverLicense,
      password,
    })
    .then(() => {
      navigation.navigate('Confirmation', {
        title: 'Conta criada',
        message: `Agora é só fazer login\ne aproveitar.`,
        nextScreenRoute: 'SignIn'
      });
    })
    .catch(() => {
      Alert.alert('Opa', 'Não possível cadastrar');
    });
    
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    
        <Container>
          <Header>
            <BackButton onPress={handleBack} />
            <Steps>
              <Bullet active={true} />
            </Steps>
          </Header>

          <Title>
            Crie sua {'\n'} conta
          </Title>
          <Subtitle>
            Faça seu cadastro de {'\n'}
            forma rápida e fácil
          </Subtitle>

          <Form>
            <FormTitle>2. Senha</FormTitle>
            <PasswordInput 
              iconName="lock"
              placeholder="Senha"
              onChangeText={setPassword}
              value={password}
            />
            <PasswordInput 
              iconName="lock"
              placeholder="Repetir Senha"
              onChangeText={setPasswordConfirm}
              value={passwordConfirm}
            />
          </Form>

          <Button 
            color={theme.colors.success}
            title="Cadastrar"
            onPress={handleRegister}
          />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}