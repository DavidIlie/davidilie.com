import Section from "@modules/Section";

export default function About() {
    return (
        <Section title="About Me">
            <div className="flex justify-center items-center space-x-10 flex-wrap md:flex-nowrap">
                <img
                    src="/images/me.png"
                    className="rounded-full w-48 h-48 mb-2"
                />
                <p className="text-1xl mb-2" style={{ fontSize: "20px" }}>
                    I'm David, a 14 year old software developer, focusing my
                    learning into web development (full stack). I've been
                    interested into computer science ever since I was small. I
                    don't know what brought me into it, it could have been my
                    father's career or my discovery of the huge world the
                    internet has to offer. For the longest time I've been
                    interested in the more technical aspects of running a
                    website, not focusing much on the interface itself. The
                    reason I created this website is to allow me to further
                    experiment with both backend and frontend programming,
                    allowing the world to see my progress.
                </p>
            </div>
        </Section>
    );
}
