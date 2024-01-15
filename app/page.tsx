import Header from '@/components/home/Header'
import MainBoard from '@/components/home/MainBoard'
import RightSide from '@/components/home/RightSide'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="px-10">
      <section className=' gap-4'>
        <div>
          <Header />
        </div>
       <div className='flex'>

        <div className='basis-4/6 grow h-full '>
          <MainBoard />
        </div>
        <div className='basis-1/6 h-full '>
          <RightSide />
        </div>
        
       </div>
      </section>
      
    </main>
  )
}
