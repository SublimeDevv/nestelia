import Particles from "@/components/Particles";
import Icons from "./components/Icons";
import ContainerHero from "./components/ContainerHero";

export default function Home() {
	return (
		<main className="   bg-gradient-to-b from-black to-black  relative min-h-dvh overflow-clip pt-12 md:pt-24">
			<div className="  size-full fixed inset-0 ">
				<Particles
					particleColors={["#dab2ff"]}
					particleCount={350}
					particleSpread={18}
					speed={0.2}
					particleBaseSize={100}
					moveParticlesOnHover={true}
					alphaParticles={false}
					disableRotation={true}
					particleHoverFactor={0.4}
					cameraDistance={40}
				/>
			</div>
			<div className="">
				<ContainerHero />
				<Icons />
			</div>
		</main>
	);
}
