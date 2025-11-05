import React from 'react';
import { VisuaForgeButton } from '@/components/VisuaForgeButton';
import { CheckCircle, Star, Zap } from 'lucide-react';

const Premium = () => {
  const plans = [
    {
      name: 'Gratuit',
      price: '0€',
      features: [
        '5 générations par jour',
        'Accès aux styles de base',
        'Stockage limité',
        'Support communautaire',
      ],
      cta: 'Commencer Gratuitement',
      variant: 'outline',
    },
    {
      name: 'Pro',
      price: '9.99€/mois',
      features: [
        '50 générations par jour',
        'Tous les styles avancés',
        'Stockage étendu',
        'Support prioritaire',
        'Accès aux fonctionnalités bêta',
      ],
      cta: 'Passer à Pro',
      variant: 'default',
    },
    {
      name: 'Illimité',
      price: '29.99€/mois',
      features: [
        'Générations illimitées',
        'Tous les styles & modèles',
        'Stockage illimité',
        'Support 24/7',
        'Accès exclusif aux nouveautés',
        'API privée',
      ],
      cta: 'Devenir Illimité',
      variant: 'secondary',
    },
  ];

  return (
    <div className="min-h-[calc(100vh-16rem)] py-12">
      <h1 className="text-5xl font-bold text-vf-blue text-center mb-10">Débloque ton potentiel créatif</h1>
      <p className="text-xl text-vf-gray text-center mb-12 max-w-3xl mx-auto">
        Passe au niveau supérieur avec nos plans Premium et accède à des fonctionnalités exclusives pour des créations sans limites.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan, index) => (
          <div
            key={plan.name}
            className="relative bg-vf-dark/60 backdrop-blur-md p-8 rounded-xl shadow-2xl border border-vf-gray flex flex-col items-center text-center transform hover:scale-105 transition-all duration-300 animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {plan.name === 'Pro' && (
              <div className="absolute -top-4 right-4 bg-vf-purple text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-glow">
                Populaire
              </div>
            )}
            <h2 className="text-3xl font-bold text-vf-blue mb-4">{plan.name}</h2>
            <p className="text-5xl font-extrabold text-vf-purple mb-6">{plan.price}</p>
            <ul className="text-lg text-white space-y-3 mb-8 text-left w-full">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-vf-blue mr-3 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <VisuaForgeButton variant={plan.variant as any} className="w-full text-lg py-3 mt-auto">
              {plan.cta}
            </VisuaForgeButton>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Premium;