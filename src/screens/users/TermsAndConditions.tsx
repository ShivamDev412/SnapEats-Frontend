import React from "react";

const TermsOfService: React.FC = () => {
  return (
    <section className="p-8 bg-zinc-800 text-zinc-100 rounded-lg">
      <h1 className="text-2xl font-bold mb-6">Terms of Service</h1>
      <p className="mb-4">Last updated: June 20, 2024</p>

      <h2 className="text-xl font-semibold mb-4">Introduction</h2>
      <p className="mb-4">
        Welcome to SnapEats! By using our app, you agree to comply with and be
        bound by these Terms of Service. This applies to both users and stores.
        Please review these terms carefully. If you do not agree to these terms,
        you should not use our app.
      </p>

      <h2 className="text-xl font-semibold mb-4">Use of Our App</h2>
      <p className="mb-4">
        <strong>For Users:</strong>
      </p>
      <p className="mb-4">
        1. <strong>Eligibility:</strong> You must be at least 18 years old to
        use our app.
      </p>
      <p className="mb-4">
        2. <strong>Account:</strong> You must create an account to use certain
        features of our app. You are responsible for maintaining the
        confidentiality of your account information.
      </p>
      <p className="mb-4">
        3. <strong>Prohibited Conduct:</strong> You agree not to use our app for
        any unlawful purpose or in a way that infringes on the rights of others.
      </p>

      <p className="mb-4">
        <strong>For Stores:</strong>
      </p>
      <p className="mb-4">
        1. <strong>Eligibility:</strong> You must be a legally recognized
        business entity to register as a store.
      </p>
      <p className="mb-4">
        2. <strong>Account:</strong> You must create an account to list your
        store and manage orders. You are responsible for maintaining the
        confidentiality of your account information.
      </p>
      <p className="mb-4">
        3. <strong>Prohibited Conduct:</strong> You agree not to use our app for
        any unlawful purpose or in a way that infringes on the rights of others.
      </p>

      <h2 className="text-xl font-semibold mb-4">Orders and Payments</h2>
      <p className="mb-4">
        <strong>For Users:</strong>
      </p>
      <p className="mb-4">
        1. <strong>Order Acceptance:</strong> We reserve the right to accept or
        reject any order placed through our app.
      </p>
      <p className="mb-4">
        2. <strong>Pricing:</strong> All prices are listed in [currency]. We
        reserve the right to change prices at any time.
      </p>
      <p className="mb-4">
        3. <strong>Payments:</strong> You must provide a valid payment method to
        place an order. We process payments through a secure third-party payment
        processor.
      </p>

      <p className="mb-4">
        <strong>For Stores:</strong>
      </p>
      <p className="mb-4">
        1. <strong>Order Management:</strong> You are responsible for managing
        and fulfilling orders placed through our app.
      </p>
      <p className="mb-4">
        2. <strong>Pricing:</strong> You must ensure that the prices listed for
        your menu items are accurate.
      </p>
      <p className="mb-4">
        3. <strong>Payments:</strong> We will remit payments for orders placed
        through our app to your designated bank account or payment processor.
      </p>

      <h2 className="text-xl font-semibold mb-4">Intellectual Property</h2>
      <p className="mb-4">
        All content on our app, including text, graphics, logos, and images, is
        the property of SnapEats or its content suppliers and is protected by
        international copyright laws. You may not use any content from our app
        without our prior written consent.
      </p>

      <h2 className="text-xl font-semibold mb-4">Limitation of Liability</h2>
      <p className="mb-4">
        SnapEats will not be liable for any indirect, incidental, special,
        punitive, or consequential damages arising out of or in connection with
        your use of our app.
      </p>

      <h2 className="text-xl font-semibold mb-4">Changes to These Terms</h2>
      <p className="mb-4">
        We may update these Terms of Service from time to time. We will notify
        you of any changes by posting the new terms on our app. You are advised
        to review these terms periodically for any changes.
      </p>

      <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
      <p className="mb-4">
        If you have any questions about these Terms of Service, please contact
        us at support@snapeats.com.
      </p>
    </section>
  );
};

export default TermsOfService;
