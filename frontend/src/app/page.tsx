import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 flex flex-col justify-center items-center p-4">
            <Card className="w-full max-w-[90%] sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
                <CardHeader className="text-center">
                    <div className="flex justify-center mb-6">
                        <Image
                            src="/logo.jpeg"
                            alt="IKAPIAR Logo"
                            width={150}
                            height={150}
                            className="rounded-full"
                        />
                    </div>
                    <CardTitle className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
                        Welcome to IKAPIAR Platform
                    </CardTitle>
                    <CardDescription className="text-lg sm:text-xl">
                        Your gateway to innovative solutions
                    </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                    <p className="text-base sm:text-lg mb-6">
                        IKAPIAR Platform is designed to empower users with
                        cutting-edge tools and resources. Join us to explore a
                        world of possibilities and transform your ideas into
                        reality.
                    </p>
                    <div className="flex flex-col justify-center space-y-4 w-full">
                        <Button asChild className="w-full">
                            <Link href="/login">Login</Link>
                        </Button>
                        <Button asChild variant="outline" className="w-full">
                            <Link href="/signup">Sign Up</Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
