var buku = [];

window.onload = () => {
  buku = JSON.parse(localStorage.getItem("buku"));
  document.dispatchEvent(new Event(RENDER_EVENT));
};

document.addEventListener("DOMContentLoaded", function () {
  const submitForm = document.getElementById("inputBook");
  submitForm.addEventListener("submit", function (event) {
    event.preventDefault();
    tambaBuku();
  });
});

const RENDER_EVENT = "render-todo";

function tambaBuku() {
  const title = document.getElementById("inputBookTitle").value;
  const penulis = document.getElementById("inputBookAuthor").value;
  const tahun = document.getElementById("inputBookYear").value;
  const status = document.getElementById("inputBookIsComplete").checked;

  const generatedID = generateId();
  var statusnya = "";
  if (status === true) {
    statusnya = true;
  } else {
    statusnya = false;
  }
  const bukuobj = validbukuobj(generatedID, title, penulis, tahun, statusnya);
  buku.push(bukuobj);

  document.dispatchEvent(new Event(RENDER_EVENT));
}

function generateId() {
  return +new Date();
}

function validbukuobj(id, title, penulis, tahun, statusnya) {
  return {
    id,
    title,
    penulis,
    tahun,
    statusnya,
  };
}

document.addEventListener(RENDER_EVENT, function () {
  const belum = document.getElementById("incompleteBookshelfList");
  const sudah = document.getElementById("completeBookshelfList");
  const judul = document.getElementById("searchBookTitle").value;

  belum.innerHTML = "";
  sudah.innerHTML = "";

  if (judul !== "") {
    for (const cari of buku) {
      if (cari.title === judul) {
        const data = makeBuku(cari);
        if (!cari.statusnya) {
          belum.append(data);
        }
        if (cari.statusnya) {
          sudah.append(data);
        }
      }
    }
  } else {
    for (const item of buku) {
      const element = makeBuku(item);
      if (!item.statusnya) {
        belum.append(element);
      }
      if (item.statusnya) {
        sudah.append(element);
      }
    }
  }
  localStorage.setItem("buku", JSON.stringify(buku));
});

// selesai bagian 1

function makeBuku(bukuobj) {
  const judul = document.createElement("h3");
  judul.classList.add("font-bold", "text-center", "text-[#7895B2]");
  judul.innerHTML = bukuobj.title;
  const penulis = document.createElement("p");
  penulis.classList.add("font-bold", "text-[#7895B2]");
  penulis.innerHTML = bukuobj.penulis;
  const tahun = document.createElement("p");
  tahun.classList.add("font-bold", "text-[#7895B2]");
  tahun.innerHTML = bukuobj.tahun;
  const aksi = document.createElement("div");
  aksi.classList.add("grid", "grid-rows-2", "pt-4", "gap-4");
  aksi.classList.add("action");

  const hapus = document.createElement("button");
  hapus.classList.add(
    "bg-red-400",
    "p-2",
    "rounded-lg",
    "text-white",
    "font-bold"
  );
  hapus.innerText = "Hapus Buku";
  hapus.addEventListener("click", function () {
    hapuskan(bukuobj.id);
  });

  if (bukuobj.statusnya === false) {
    const keudah = document.createElement("button");
    keudah.classList.add(
      "bg-green-300",
      "p-2",
      "rounded-lg",
      "text-black/50",
      "font-bold"
    );
    keudah.innerText = "Selesai dibaca";
    keudah.addEventListener("click", function () {
      yaudah(bukuobj.id);
    });
    aksi.append(keudah, hapus);
  } else if (bukuobj.statusnya === true) {
    const ehbalek = document.createElement("button");
    ehbalek.classList.add("bg-green-300", "p-2", "rounded-lg");
    ehbalek.innerText = "Belum selesai di baca";
    ehbalek.addEventListener("click", function () {
      urung(bukuobj.id);
    });
    aksi.append(ehbalek, hapus);
  }

  const tampilanbuku = document.createElement("article");
  tampilanbuku.classList.add("book_item");
  tampilanbuku.classList.add(
    "bg-white",
    "p-4",
    "rounded-lg",
    "shadow-lg",
    "w-fit"
  );
  tampilanbuku.setAttribute("id", bukuobj.id);
  tampilanbuku.append(judul, penulis, tahun, aksi);

  return tampilanbuku;
}

function hapuskan(idnya) {
  const target = cariId(idnya);
  if (target === null) return;
  buku.shift();
  document.dispatchEvent(new Event(RENDER_EVENT));
}

function yaudah(idnya) {
  const target = cariId(idnya);
  if (target === null) return;
  target.statusnya = true;
  document.dispatchEvent(new Event(RENDER_EVENT));
}

function urung(idnya) {
  const target = cariId(idnya);
  if (target === null) return;
  target.statusnya = false;
  document.dispatchEvent(new Event(RENDER_EVENT));
}

function cariId(idboss) {
  for (const item of buku) {
    if (item.id === idboss) {
      return item;
    }
  }
  return null;
}

//selesai bagian tampilan belumsiap ,siap dan hapus

document.addEventListener("DOMContentLoaded", function () {
  const submitForm = document.getElementById("searchBook");
  submitForm.addEventListener("submit", function (event) {
    event.preventDefault();
    document.dispatchEvent(new Event(RENDER_EVENT));
    document.getElementById("searchBookTitle").value = "";
  });
});
