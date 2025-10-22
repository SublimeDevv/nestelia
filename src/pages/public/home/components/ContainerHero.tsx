import { itemVariants, containerVariants } from "@/lib/animation-variants";
import ShinyText from "@/components/ShinyText";
import { motion } from "motion/react";
import BlurText from "@/components/BlurText";
export default function ContainerHero() {
	return (
		<section>
			<motion.div
				className="flex  max-w-2xl flex-col gap-2 text-center mx-auto"
				variants={containerVariants}
				initial="hidden"
				animate="visible"
			>
				<motion.div variants={itemVariants} className="">
					<BlurText
						className="font-retro  text-center  font-semibold flex justify-center items-center    text-3xl   sm:text-6xl"
						text="Embark on an Epic Pixel Art Adventure in the World of Nestelia"
						delay={150}
						animateBy="words"
						clForSegment="bg-gradient-to-r from-purple-400 via-blue-300 to-fuchsia-500 bg-clip-text text-transparent pb-1"
					></BlurText>
				</motion.div>
				<motion.div variants={itemVariants} className="mt-2">
					<div className="flex items-center justify-center">
						<div className=" w-fit  rounded-full  bg-gray-500/35 text-center ">
							<ShinyText
								speed={3}
								className=" px-4 py-1  select-none"
								bg="#efb100"
								color="rgba(242, 242, 242, 0.62)"
								text="Coming Soon!"
							/>
						</div>
					</div>
				</motion.div>
			</motion.div>
		</section>
	);
}
