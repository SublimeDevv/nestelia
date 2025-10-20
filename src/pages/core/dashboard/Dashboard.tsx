import { Link } from 'react-router-dom';
import { MessageSquare, BarChart3, Users, Settings, TrendingUp } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function Dashboard() {
  const { user } = useAuth();

  const stats = [
    {
      title: 'Conversaciones',
      value: '0',
      icon: MessageSquare,
      color: 'bg-blue-500',
      change: '+0%',
    },
    {
      title: 'Usuarios Activos',
      value: '1',
      icon: Users,
      color: 'bg-green-500',
      change: '+100%',
    },
    {
      title: 'Análisis',
      value: '0',
      icon: BarChart3,
      color: 'bg-purple-500',
      change: '0%',
    },
    {
      title: 'Rendimiento',
      value: '100%',
      icon: TrendingUp,
      color: 'bg-orange-500',
      change: '+0%',
    },
  ];

  const quickActions = [
    {
      title: 'Ir al Chatbot',
      description: 'Inicia una conversación con el asistente',
      icon: MessageSquare,
      link: '/chatbot',
      color: 'bg-blue-600 hover:bg-blue-700',
    },
    {
      title: 'Configuración',
      description: 'Configura tu cuenta y preferencias',
      icon: Settings,
      link: '/settings',
      color: 'bg-gray-600 hover:bg-gray-700',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
          Bienvenido, {user?.name}!
        </h1>
        <p className="text-gray-400">
          Este es tu panel de control. Aquí podrás gestionar todas tus actividades.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-colors"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="text-white" size={24} />
              </div>
              <span className="text-sm text-green-400">{stat.change}</span>
            </div>
            <h3 className="text-gray-400 text-sm mb-1">{stat.title}</h3>
            <p className="text-3xl font-bold text-white">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-4">Acciones Rápidas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {quickActions.map((action, index) => (
            <Link
              key={index}
              to={action.link}
              className={`${action.color} rounded-xl p-6 transition-all transform hover:scale-105`}
            >
              <div className="flex items-start space-x-4">
                <div className="bg-white/10 p-3 rounded-lg">
                  <action.icon className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-1">
                    {action.title}
                  </h3>
                  <p className="text-white/80 text-sm">{action.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-4">Actividad Reciente</h2>
        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
          <p className="text-gray-400 text-center py-8">
            No hay actividad reciente. ¡Comienza explorando el chatbot!
          </p>
        </div>
      </div>
    </div>
  );
}

