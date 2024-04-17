import Image from "next/image";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
    return (
        <main className="flex h-full flex-col items-center justify-center">
            <Image
                priority
                alt="Question mark illustration"
                src="/imgs/not-found.png"
                width={256}
                height={256}
                quality={100}
            />

            <div className="flex flex-col items-center gap-y-8">
                <div className="flex flex-col items-center gap-y-2">
                    <h1 className="text-center text-title">Page Not Found</h1>

                    <p className="text-center text-sm text-muted-foreground">
                        Seems like the link is either broken or cannot be found&#46;
                    </p>
                </div>

                <Link href="/" className={buttonVariants({ size: "lg" })}>
                    Return home
                </Link>
            </div>
        </main>
    );
}
