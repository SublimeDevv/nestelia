import React from "react";

interface ShinyTextProps {
	text: string;
	disabled?: boolean;
	speed?: number;
	className?: string;
	bg?: string;
	color?: string;
}

const ShinyText: React.FC<ShinyTextProps> = ({
	text,
	disabled = false,
	speed = 5,
	className = "",
	bg,
	color = "#b5b5b5a4",
}) => {
	const animationDuration = `${speed}s`;

	return (
		<div
			className={`bg-clip-text inline-block ${disabled ? "" : "animate-shine"} ${className}`}
			style={{
				color: color,
				backgroundImage: bg
					? `linear-gradient(
    120deg,
    ${bg}00 40%, 
    ${bg}ff 50%, 
    ${bg}00 60%)`
					: "linear-gradient(120deg, rgba(255, 255, 255, 0) 40%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0) 60%)",
				backgroundSize: "200% 100%",
				WebkitBackgroundClip: "text",
				animationDuration: animationDuration,
			}}
		>
			{text}
		</div>
	);
};

export default ShinyText;
