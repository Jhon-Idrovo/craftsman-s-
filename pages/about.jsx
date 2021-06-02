import Image from "next/image";

function About() {
  return (
    <div>
      <h1 className="title-base mb-4">Our Team</h1>
      <Image
        src="/images/team.jpg"
        alt="Our team members"
        layout="responsive"
        width={300}
        height={200}
      />
      <h1 className="title-base mt-12">What we are</h1>
      <p className="m-4">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio tempora
        nemo saepe commodi ex? Atque perspiciatis sed itaque et commodi quasi
        nisi laudantium in perferendis quo? Quis error quibusdam ad? Ratione
        nobis nesciunt dolorem saepe corrupti ipsum enim eaque, incidunt
        delectus quidem debitis voluptate fugiat ea numquam dolore expedita
        dignissimos dolorum esse. Velit molestiae, consequatur quidem voluptatem
        quis repellendus qui.
      </p>
      <h1 className="title-base  mt-12">
        What we do <br /> Why we do it
      </h1>
      <p className="m-4">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis ut
        quae, quam amet corrupti excepturi obcaecati maxime molestias harum
        repellat nihil laudantium minus accusantium numquam saepe facere rerum
        accusamus cupiditate? Commodi iusto minus cupiditate error! Provident
        dolore obcaecati laboriosam fugit saepe consectetur error explicabo
        ratione eum, delectus soluta repudiandae laborum reprehenderit, tempore
        possimus deleniti mollitia cumque quod commodi est vero!
      </p>
      <h1 className="title-base  mt-12">Our Mision</h1>
      <p className="m-4">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illo vero
        architecto temporibus, repellendus quae facere fugit tenetur, vitae
        quis, excepturi dolore accusantium quod. Incidunt culpa nesciunt iste!
        Dolorum, enim quisquam?
      </p>
      <h1 className="title-base  mt-12">Our vision</h1>
      <p className="m-4">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Error,
        doloribus itaque sit ab dolor omnis sint eum consequuntur id quasi,
        magnam incidunt eligendi harum reiciendis est veritatis quaerat
        temporibus. Totam!
      </p>
    </div>
  );
}

export default About;
