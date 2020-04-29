const BASE_URI = 'slidemaker/api/v1';

export const resources = {
  PLANOS: `${BASE_URI}/plans`,
  AUTH: `${BASE_URI}/auth`,

  APRESENTACOES: `${BASE_URI}/presentations`,
  USUARIOS: `${BASE_URI}/users`,

  THEMES: `${BASE_URI}/themes`,

  IDIOMS: `${BASE_URI}/idioms`,
  DATA_SOURCES: `${BASE_URI}/data-sources`,

  ASSINATURAS: `${BASE_URI}/subscriptions`,

  AUTH_USUARIO_LOGADO: `${BASE_URI}/auth/usuario-logado`,

  // TRANSACOES: `${BASE_URI}/transacoes`,
};
