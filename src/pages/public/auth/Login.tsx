import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "@/stores/authStore";
import { useToast } from "@/stores/toastStore";
import { Mail, Lock, LogIn, Eye, EyeOff } from "lucide-react";
import Logo from "@/components/Logo";
import { motion } from "motion/react";
import { loginSchema } from "./schemas";
import { ROUTES } from "@/router/routes.config";

type LoginFormData = z.infer<typeof loginSchema>;

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState<string>("");

  const { login } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setLoginError("");
      await login(data.email, data.password);
      toast.success("Sesión iniciada correctamente");
      navigate("/dashboard");
    } catch (err: any) {
      setLoginError(err.message);
    }
  };

  return (
    <div>
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="w-full max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-app backdrop-blur-xl border border-gray-800 rounded-2xl p-8 shadow-2xl"
          >
            <div className="flex justify-center mb-6">
              <Logo size="md" />
            </div>

            <div className="text-center mb-8">
              <p className="text-gray-400">Inicia sesión en tu cuenta</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {loginError && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-500/10 border border-red-500 rounded-lg p-3"
                >
                  <p className="text-sm text-red-500 text-center">
                    {loginError}
                  </p>
                </motion.div>
              )}

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Correo electrónico
                </label>
                <div className="relative">
                  <Mail
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <input
                    type="email"
                    id="email"
                    {...register("email")}
                    onChange={(e) => {
                      register("email").onChange(e);
                      if (loginError) setLoginError("");
                    }}
                    className={`w-full pl-10 pr-4 py-3 bg-gray-900/50 border ${
                      errors.email ? "border-red-500" : "border-gray-700"
                    } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 ${
                      errors.email
                        ? "focus:ring-red-500"
                        : "focus:ring-purple-500"
                    } focus:border-transparent transition`}
                    placeholder="nestelia@niux.com"
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Contraseña
                </label>
                <div className="relative">
                  <Lock
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    {...register("password")}
                    onChange={(e) => {
                      register("password").onChange(e);
                      if (loginError) setLoginError("");
                    }}
                    className={`w-full pl-10 pr-12 py-3 bg-gray-900/50 border ${
                      errors.password ? "border-red-500" : "border-gray-700"
                    } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 ${
                      errors.password
                        ? "focus:ring-red-500"
                        : "focus:ring-purple-500"
                    } focus:border-transparent transition`}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-300 hover:text-purple-400 transition-colors focus:outline-none"
                    aria-label={
                      showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                    }
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="flex justify-end">
                <Link
                  to="/forgot-password"
                  className="text-sm text-purple-400 hover:text-purple-300 transition"
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                className="w-full flex items-center justify-center space-x-2 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span>Cargando...</span>
                ) : (
                  <>
                    <LogIn size={20} />
                    <span>Iniciar Sesión</span>
                  </>
                )}
              </motion.button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-400">
                ¿No tienes una cuenta?{" "}
                <Link
                  to="/register"
                  className="text-purple-400 hover:text-purple-300 font-medium transition"
                >
                  Regístrate aquí
                </Link>
              </p>
            </div>

            <div className="mt-4 text-center">
              <Link
                to="/"
                className="text-sm text-gray-500 hover:text-gray-400 transition"
              >
                ← Volver al inicio
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
