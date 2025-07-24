import Header from '../components/Header';
import Footer from '../components/Footer';
import Timeline from '../components/Timeline';

export default function TimelinePage() {
  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      <Header />
      <Timeline />
      <Footer />
    </div>
  );
}
