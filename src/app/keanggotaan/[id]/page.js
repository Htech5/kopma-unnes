import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import MagazineViewerWrapper from "./MagazineViewerWrapper";

export const dynamicMode = 'force-dynamic';

export async function generateStaticParams() {
  return [];
}

export default async function MagazineDetailPage({ params }) {
  const { id } = await params;

  return (
    <>
      <Navbar />
      <main className="so-page magazine-page keanggotaan-page--flush" id="main-content">
        <MagazineViewerWrapper id={id} />
      </main>
      <Footer />
    </>
  );
}
