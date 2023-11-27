import { PublicNavBarTabs } from "../components/PublicNavBarTabs";

const sections = [
  {
    title: "Introduction",
    description: `The following terms and conditions govern your use of www.ezex.ca (hereinafter referred to as "this website"), and the process of your selection of delivery on this website. Use of this website signifies your agreement to abide by and be bound by the following terms and conditions. If you do not agree to the following terms and conditions, please stop using this website.`,
  },
  {
    title: "Normal information",
    description: `www.ezex.ca is the property of EZ Express (company number 14762789, whose registered office is 3330 Midland Ave unit 238, scarborough, ON, M1V 5E7. EZ Express (hereinafter referred to as "we", "us") is currently only in For delivery in the GTA area, please read the following sections on "Site Operations" and "Services and Products" for more detailed instructions.`,
  },
  {
    title: "Additional site policies",
    description: `Please read our Terms and Conditions, Return Policy, and Privacy and Cookie Policy (collectively, the "Site Policies"). All site policies are based on these terms and conditions and apply to your use of and access to this site and your selection of delivery options on this site. If you do not agree with our site policies, please do not use this site. We reserve the right to make changes to this website, the website policies and the terms and conditions at any time: If any of the following provisions is invalidated, deemed invalid or for any reason unenforceable, that provision shall be deemed severable and any remaining The validity and enforceability of the terms shall also not be affected.`,
  },
  {
    title: "Visit this site",
    description: `It is your responsibility to ensure that your device (computer, laptop, netbook, tablet or other mobile device) complies with all necessary technical specifications to enable your browser to access and use this website smoothly and is compatible with this website. \n\nFrom time to time, we may impose restrictions on registered users to use or browse some functions of this website, some or all of the content. You must also ensure that all registration details you provide are correct. If you choose, or are provided with, a login ID (for example, username and password or other login information) as part of our security procedures, you must treat such information as confidential and not disclose it to any third party. You shall be solely responsible for all activities that occur under your login ID, and you must notify us immediately of any unauthorized use or other breach of security. We reserve the right to prohibit the use of a login ID at any time if we believe that you have not complied with any of these terms and conditions, or if there is evidence that you have provided incorrect user registration information.`,
  },
  {
    title: "Website operations and service delivery",
    description: `EZ Express is responsible for all operation and service delivery of this website. These services include, but are not limited to, customer service, hosting, and logistics.\n\nPlease note that the supplier is providing delivery logistics services to you (the customer), which means that you are signing a contract with the supplier for the delivery service provided by it. Suppliers will charge fees for these services, and these fees will appear prior to your checkout. For clarity, please note that payment for delivery service charges will be received by EZ Express. Payment for delivery services will be received by EZ Express Company, which manages any payment processing.
`,
  },
  {
    title: "Product",
    description: `All products are shipped by merchants using this website. EZ Express makes every effort to ensure that all product descriptions are as accurate as possible. and the integrity of the item. However, we cannot guarantee that all descriptions are completely accurate, complete, reliable or error-free. and whether the item is damaged. Please note that in case of the following situations, we will arrange staff to assist. Contact merchants and customers.`,
  },
  {
    title: "Delivery notes",
    description: `The deliveries you choose on this site are verified and not forwarded. When placing an order, you confirm that the information on the product to be delivered is correct and you accept our terms and conditions. Neither EZ Express nor the Supplier shall be liable to you for any loss of profits, loss of business, business interruption, or lost business opportunity.
product delivery. \n\nYou can complete the delivery by filling in the information and following the prompts on the screen. You may review and correct any typographical errors in your order at any time until you submit your order to us by clicking the "OK" button on the shipping page. All orders are subject to verification by us. Once an order has been placed, a display on our website will confirm receipt of your order and will provide you with an order reference number. Please note that this does not mean your order has been accepted by us. Your order constitutes only the intent to ship. All orders are subject to acceptance by us. We are under no obligation to accept your order and reserve the right to refuse any order in our sole discretion. However, by clicking the "OK" button, you assume the obligation to purchase the product. Where we accept your order, we will confirm acceptance of the order by sending you an email confirming that the Products have been dispatched (“Shipping Confirmation”).\nThe contract between you and us for delivery services is only formed when we send you a dispatch confirmation. After signing the contract, we are legally obliged to provide you with services in accordance with the contract. This contract only relates to products that we have confirmed dispatched in our dispatch confirmation. If your order contains other unshipped products, we are under no obligation to supply you with such products until a corresponding confirmation of shipment has been issued.`,
  },
  {
    title: "Shipping cost",
    description: `You are responsible for the shipping costs associated with the delivery service of items you ship from this site. These charges will be detailed in your order confirmation.\n\nWe currently only accept emt payment, if there is any change in the future, the terms and regulations will be revised.
`,
  },
];
export const TermsAndConditions = () => {
  return (
    <>
      <PublicNavBarTabs />

      <div className="bg-white px-6 pb-32 lg:px-8">
        <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Terms & Conditions
          </h1>
          {sections.map(({ title, description }) => (
            <div key={title}>
              <p className="text-base font-semibold pt-8 pb-2 leading-7 text-indigo-600">
                {title}
              </p>
              <p className="whitespace-pre-line text-xl leading-8">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
