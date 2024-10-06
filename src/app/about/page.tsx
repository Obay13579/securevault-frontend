import Image from "next/image";
import Ivan from "@/public/assets/ivan.jpg";
import Rio from "@/public/assets/rio.jpg";
import Irfan from "@/public/assets/irfan.jpg";
import Obi from "@/public/assets/obi.jpg";

export default function Home() {
    return (
        <div className="w-full h-screen flex items-center justify-center font-[family-name:var(--font-now)]" style={{ backgroundColor: "#7A1CAC" }}>
            <div className="flex flex-row flex-wrap justify-center items-stretch">
                <div className="card w-96 shadow-xl m-2 flex flex-col" style={{ backgroundColor: '#2E073F', minHeight: '400px' }}>
                    <div className="avatar justify-center mt-8">
                        <figure className="w-52 rounded-full">
                            <Image src={Ivan} alt="Ivan's Avatar" />
                        </figure>
                    </div>
                    <div className="card-body items-center text-center flex-grow">
                        <div className="mb-2 text-3xl">Muhammad Ivan Ardianadi Afiat</div>
                        <div className="m-2 text-2xl">5025221178</div>
                    </div>
                </div>

                <div className="card w-96 shadow-xl m-2 flex flex-col" style={{ backgroundColor: '#2E073F', minHeight: '400px' }}>
                    <div className="avatar justify-center mt-8">
                        <figure className="w-52 rounded-full">
                            <Image src={Rio} alt="Rio's Avatar" />
                        </figure>
                    </div>
                    <div className="card-body items-center text-center flex-grow">
                        <div className="mb-2 text-3xl">Pradipta Arya Daniswara</div>
                        <div className="m-2 text-2xl">5025221185</div>
                    </div>
                </div>

                <div className="card w-96 shadow-xl m-2 flex flex-col" style={{ backgroundColor: '#2E073F', minHeight: '400px' }}>
                    <div className="avatar justify-center mt-8">
                        <figure className="w-52 rounded-full">
                            <Image src={Irfan} alt="Irfan's Avatar" />
                        </figure>
                    </div>
                    <div className="card-body items-center text-center flex-grow">
                        <div className="mb-2 text-3xl">Irfan Ridhana</div>
                        <div className="m-2 text-2xl">5025221214</div>
                    </div>
                </div>

                <div className="card w-96 shadow-xl m-2 flex flex-col" style={{ backgroundColor: '#2E073F', minHeight: '400px' }}>
                    <div className="avatar justify-center mt-8">
                        <figure className="w-52 rounded-full">
                            <Image src={Obi} alt="Obi's Avatar" />
                        </figure>
                    </div>
                    <div className="card-body items-center text-center flex-grow">
                        <div className="mb-2 text-3xl">Nuril Qolbi Zam Zami</div>
                        <div className="m-2 text-2xl">502522296</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
