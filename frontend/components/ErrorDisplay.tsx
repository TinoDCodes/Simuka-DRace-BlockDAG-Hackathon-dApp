import { motion } from "framer-motion";
import { Button } from "@heroui/react";
import { AlertTriangle, RefreshCw, ArrowLeft } from "lucide-react";

type ErrorDisplayProps = {
  title: string;
  message: string;
  onRetry?: () => void;
  onGoBack?: () => void;
  errorCode?: string | number;
  lastUpdatedAt?: number;
};

const ErrorDisplay = ({
  title,
  message,
  onRetry,
  onGoBack,
  errorCode,
  lastUpdatedAt,
}: ErrorDisplayProps) => {
  const upatedTime = lastUpdatedAt
    ? new Date(lastUpdatedAt).toLocaleTimeString()
    : undefined;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center grow p-6"
    >
      <div className="max-w-md w-full bg-[rgba(15,15,25,0.65)] backdrop-blur-lg border border-[var(--color-border)] rounded-[var(--radius-base)] p-8 text-center">
        {/* Animated error icon */}
        <motion.div
          animate={{
            rotate: [0, 10, -10, 10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "mirror",
          }}
          className="mx-auto w-20 h-20 rounded-full bg-[var(--color-accent)]/10 flex items-center justify-center mb-6"
        >
          <AlertTriangle className="w-10 h-10 text-[var(--color-accent)]" />
        </motion.div>

        {/* Error code */}
        {errorCode && (
          <div className="font-mono text-xs text-[var(--color-accent)] bg-[var(--color-accent)]/10 py-1 px-3 rounded-full inline-block mb-3">
            ERROR: {errorCode}
          </div>
        )}

        <h2 className="text-2xl font-bold text-white mb-3">{title}</h2>
        <p className="text-gray-400 mb-8">{message}</p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {onGoBack && (
            <Button
              className="bg-transparent text-[var(--foreground)] border border-[var(--color-border)] hover:bg-[var(--color-muted-bg)] transition-colors"
              startContent={<ArrowLeft className="w-4 h-4" />}
              onPress={onGoBack}
            >
              Go Back
            </Button>
          )}

          {onRetry && (
            <Button
              className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-[#14161A] font-bold shadow-lg shadow-[var(--color-primary)]/30 hover:shadow-[var(--color-primary)]/50 transition-all"
              startContent={<RefreshCw className="w-4 h-4" />}
              onPress={onRetry}
            >
              Retry
            </Button>
          )}
        </div>

        {/* Blockchain status */}
        <div className="mt-8 pt-6 border-t border-[var(--color-border)]">
          <div className="flex items-center justify-center text-sm text-gray-500 mb-2">
            <div className="w-2 h-2 rounded-full bg-[var(--color-secondary)] mr-2"></div>
            Network status: Operational
          </div>
          {upatedTime && (
            <div className="text-xs text-gray-600">
              Last checked: {upatedTime}
            </div>
          )}
        </div>
      </div>

      {/* Decorative blockchain nodes */}
      <div className="flex mt-8">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="w-3 h-3 rounded-full bg-[var(--color-primary)] mx-1"
            animate={{
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default ErrorDisplay;
