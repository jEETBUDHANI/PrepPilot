import Container from "../common/Container";

const companies = [
  "Google",
  "Microsoft",
  "Amazon",
  "Adobe",
  "Infosys",
  "Netflix",
];

function TrustedCompanies() {
  return (
    <section className="rounded-3xl bg-slate-950 px-6 py-20 sm:px-10">
      <Container>
        <div className="text-center">
          <p className="text-sm uppercase tracking-[0.4em] text-amber-400">Trusted by leading teams</p>
          <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">Built for candidates and hiring teams alike.</h2>
        </div>
        <div className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
          {companies.map((company) => (
            <div
              key={company}
              className="flex items-center justify-center rounded-3xl border border-white/10 bg-white/5 py-6 text-sm font-semibold text-slate-200 transition-all duration-300 hover:text-white hover:border-amber-500 hover:-translate-y-2"
            >
              {company}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default TrustedCompanies;