import { Section } from "./Section";

export const ProblemsSection = () => {
  return (
    <Section>
      <h2 className="text-center text-3xl font-bold">
        Increase your tracking = increase your result
      </h2>
      <div className="m-auto mt-4 flex max-w-3xl gap-4 max-lg:flex-col">
        <div className="flex flex-1 flex-col items-start rounded-lg bg-red-500/50 p-4 shadow lg:p-8">
          <h3 className="text-xl font-bold">Before sport-lix.com</h3>
          <ul className="flex list-disc flex-col items-start text-left">
            <li>Customer don't trust your program</li>
            <li>Customer doesn't make tracking because it's too long</li>
            <li>It's hard to get tracking from customer</li>
          </ul>
        </div>
        <div className="flex flex-1 flex-col items-start rounded-lg bg-green-500/50 p-4 shadow lg:p-8">
          <h3 className="text-xl font-bold">After sport-lix.com</h3>
          <ul className="flex list-disc flex-col items-start text-left">
            <li>Customer trust your program and PAY 💰</li>
            <li>You get A LOT of tracking because of the process</li>
            <li>Customer WANT give you a tracking</li>
          </ul>
        </div>
      </div>
    </Section>
  );
};