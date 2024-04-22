import CategoryFilter from '@/components/shared/CategoryFilter';
import Collection from '@/components/shared/Collection'
import Search from '@/components/shared/Search';
import { Button } from '@/components/ui/button'
import { getAllEvents } from '@/lib/actions/event.actions';
import { SearchParamProps } from '@/types';
import Image from 'next/image'
import Link from 'next/link'

export default async function Home({ searchParams }: SearchParamProps) {
  const page = Number(searchParams?.page) || 1;
  const searchText = (searchParams?.query as string) || '';
  const category = (searchParams?.category as string) || '';

  const events = await getAllEvents({
    query: searchText,
    category,
    page,
    limit: 6
  })

  return (
    <>
<section className="bg-dotted-pattern bg-contain py-10 md:py-20">
  <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
    <div className="flex flex-col justify-center gap-8">
      <h1 className="h1-bold">Host, Connect, Treat Your Health, Through ❤️ <span className="text-red-600">DiagnoAssist!</span></h1>
      <p className="p-regular-20 md:p-regular-24">Book and learn helpful tips from 3,168+ mentors, certified doctors, and professionals in world-class Facilities with our global community.</p>
      <Button size="lg" asChild className="button w-full sm:w-fit">
        <Link href="#events">
          Explore Now
        </Link>
      </Button>
    </div>

    {/* <div style={{height:"100%", overflow: "hidden", display: "flex", justifyContent: "center", alignItems: "center" }}>       */}
    <div>
    <img src="./assets/images/landing.jpg" />
    </div>
    </div>
  {/* </div> */}
</section>







      <section id="events" className="wrapper my-8 flex flex-col gap-8 md:gap-12">
        <h2 className="h2-bold">Trusted by <br /> Thousands of Patients and Doctors</h2>

        <div className="flex w-full flex-col gap-5 md:flex-row">
          <Search />
          <CategoryFilter />
        </div>

        <Collection 
          data={events?.data}
          emptyTitle="No Events Found"
          emptyStateSubtext="Come back later"
          collectionType="All_Events"
          limit={6}
          page={page}
          totalPages={events?.totalPages}
        />
      </section>
    </>
  )
}