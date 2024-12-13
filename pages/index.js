import { useEffect } from "react";
import { useRouter } from "next/router";

function HomePage() {
    const router = useRouter();

    useEffect(() => {
        router.push('/today');
      }, [router]);

}
export default HomePage;