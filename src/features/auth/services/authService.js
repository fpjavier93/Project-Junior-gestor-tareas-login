import { data } from 'react-router-dom';
import { supabase } from '../../../../utils/supabase';
import { Navigate } from 'react-router-dom';

/**
 * Servicio de Autenticación con Supabase
 */

// ============ REGISTRO ============
export const signUp = async ({ apellidos, email, empresa, nombre, password }) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,

      options: {
        data: {
          apellidos, empresa, nombre
        }
      }
    });

    if (error) throw error;

    return {
      success: true,
      data: data.user,
      message: 'Registro exitoso. Por favor verifica tu email.',
    };
  } catch (error) {
    console.log(error)
    return {
      success: false,
      error: error.message,
    };
  }
};

// ============ LOGIN ============
export const signIn = async (email, password) => {

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    console.log("data.user", data.user);
    return {
      success: true,
      data: data.user,
      message: 'Inicio de sesión exitoso',
    };

  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
};

// ============ LOGOUT ============
export const signOut = async () => {

  try {
    const { error } = await supabase.auth.signOut();

    if (error) throw error;
    return {
      success: true,
      message: 'Sesión cerrada correctamente',
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }

};

// ============ OBTENER USUARIO ACTUAL ============
export const getCurrentUser = async () => {
  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error) throw error;

    return {
      success: true,
      user,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
};

// ============ OBTENER SESIÓN ACTUAL ============
export const getSession = async () => {
  try {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (error) throw error;

    return {
      success: true,
      session,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
};

// ============ RESET DE CONTRASEÑA ============
export const resetPassword = async (email) => {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email);

    if (error) throw error;

    return {
      success: true,
      message: 'Email de recuperación enviado. Revisa tu email.',
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
};

// ============ ACTUALIZAR CONTRASEÑA ============
export const updatePassword = async (newPassword) => {
  try {
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) throw error;

    return {
      success: true,
      message: 'Contraseña actualizada correctamente',
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
};

// ============ ESCUCHAR CAMBIOS DE AUTENTICACIÓN ============
export const onAuthStateChange = (callback) => {
  const subscription = supabase.auth.onAuthStateChange(
    (event, session) => {
      callback(event, session);
    }
  );

  return subscription;
};
