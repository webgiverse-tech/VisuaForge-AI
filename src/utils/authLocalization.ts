export const frenchLocalization = {
  variables: {
    sign_in: {
      email_label: 'Adresse e-mail',
      password_label: 'Mot de passe',
      email_input_placeholder: 'Votre adresse e-mail',
      password_input_placeholder: 'Votre mot de passe',
      button_label: 'Se connecter',
      social_provider_text: 'Se connecter avec {{provider}}',
      forgotten_password_text: 'Mot de passe oublié ?',
      no_account_text: 'Pas encore de compte ? Inscrivez-vous',
    },
    sign_up: {
      email_label: 'Adresse e-mail',
      password_label: 'Mot de passe',
      email_input_placeholder: 'Votre adresse e-mail',
      password_input_placeholder: 'Votre mot de passe',
      button_label: 'S\'inscrire',
      social_provider_text: 'S\'inscrire avec {{provider}}',
      // Le lien "Déjà un compte ?" est géré par le paragraphe personnalisé en bas de la page Register.tsx
      // et n'est pas inclus ici pour éviter la duplication.
    },
    forgotten_password: {
      email_label: 'Adresse e-mail',
      email_input_placeholder: 'Votre adresse e-mail',
      button_label: 'Envoyer les instructions de réinitialisation',
      link_text: 'Retour à la connexion',
      confirmation_text: 'Vérifiez votre e-mail pour le lien de réinitialisation du mot de passe.',
    },
    update_password: {
      password_label: 'Nouveau mot de passe',
      password_input_placeholder: 'Votre nouveau mot de passe',
      button_label: 'Mettre à jour le mot de passe',
      confirmation_text: 'Votre mot de passe a été mis à jour.',
    },
    magic_link: {
      email_input_placeholder: 'Votre adresse e-mail',
      button_label: 'Envoyer le lien magique',
      link_text: 'Retour à la connexion',
      confirmation_text: 'Vérifiez votre e-mail pour le lien magique.',
    },
    verify_otp: {
      email_input_placeholder: 'Votre adresse e-mail',
      phone_input_placeholder: 'Votre numéro de téléphone',
      token_input_placeholder: 'Votre code OTP',
      button_label: 'Vérifier le code OTP',
      link_text: 'Retour à la connexion',
      confirmation_text: 'Vérifiez votre e-mail/téléphone pour le code OTP.',
    },
    common: {
      not_a_valid_email: 'Adresse e-mail non valide',
      password_too_short: 'Le mot de passe doit contenir au moins 6 caractères',
      invalid_email_password: 'Identifiants de connexion invalides',
      bad_email_password: 'Identifiants de connexion invalides',
      email_not_confirmed: 'Veuillez confirmer votre adresse e-mail',
      // Ajoutez d'autres messages d'erreur courants de Supabase si nécessaire
    },
  },
};