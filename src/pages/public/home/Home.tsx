import Particles from "@/components/Particles";
import Icons from "./components/Icons";
import ContainerHero from "./components/ContainerHero";
import Navbar from "./components/Navbar";

export default function Home() {
	return (
		<main className="bg-gradient-to-b from-black to-black relative min-h-dvh overflow-clip">
			<Navbar />
			<div className="size-full fixed inset-0">
				<Particles
					particleColors={["#ffffff"]}
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
			<div className="relative pt-24">
				<ContainerHero />
				<Icons />
			</div>
		</main>
	);
}
