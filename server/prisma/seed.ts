import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaClient } from "../src/generated/prisma/client";
import { TruckStatus, StatusSource } from "../src/generated/prisma/enums";

const prisma = new PrismaClient();

const defaultOwner = {
  name: "Demo Owner",
  email: "owner@streeteats.test",
  password: "owner1234",
  trucks: ["Lynn's", "Taco's Don Memo"],
};

const trucks = [
  {
    name: "Cucina Zapata",
    description: "Thai-Mex fusion staples with huge portions",
    cuisineType: "Thai-Mex",
    imageUrl: "https://images.unsplash.com/photo-1528832992873-5bb578167d94?auto=format&fit=crop&w=1200&q=80",
    defaultLocation: "Spruce & 37th",
    defaultLatitude: 39.9524,
    defaultLongitude: -75.1931,
    venmoHandle: "@cucinazapata",
    menuItems: {
      create: [
        { name: "Captain Crunch Burrito", description: "Crispy chicken, avocado, captain crunch", priceCents: 1400, isFeatured: true },
        { name: "Thai Short Rib Tacos", description: "Slow cooked ribs with fresh slaw", priceCents: 1200 },
      ],
    },
  },
  {
    name: "Magic Carpet",
    description: "Vegetarian staples on the go",
    cuisineType: "Vegetarian",
    imageUrl: "https://images.unsplash.com/photo-1504753793650-d4a2b783c15c?auto=format&fit=crop&w=1200&q=80",
    defaultLocation: "Locust Walk",
    defaultLatitude: 39.9512,
    defaultLongitude: -75.1975,
    venmoHandle: "@magiccarpet",
    menuItems: {
      create: [
        { name: "Falafel Platter", priceCents: 1100, description: "Falafel with tabouli and hummus" },
        { name: "Tempeh Wrap", priceCents: 1000 },
      ],
    },
  },
  {
    name: "Korean BBQ Express",
    description: "Fast bulgogi bowls and kimchi fries",
    cuisineType: "Korean",
    imageUrl: "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1200&q=80",
    defaultLocation: "33rd & Arch",
    defaultLatitude: 39.9555,
    defaultLongitude: -75.1910,
    venmoHandle: "@kbbqexpress",
    menuItems: {
      create: [
        { name: "Bulgogi Bowl", priceCents: 1300 },
        { name: "Kimchi Fries", priceCents: 900, isFeatured: true },
      ],
    },
  },
  {
    name: "Lynn's",
    description: "Breakfast classics and campus-favorite cheesesteaks",
    cuisineType: "Breakfast",
    imageUrl: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=1200&q=80",
    defaultLocation: "3600 Spruce St, Philadelphia, PA 19104",
    defaultLatitude: 39.9516,
    defaultLongitude: -75.1949,
    venmoHandle: "@lynnsfoodtruck",
    menuItems: {
      create: [
        { name: "Bacon Egg and Cheese", priceCents: 600, description: "Griddled bacon, fluffy eggs, melted cheese" },
        { name: "Cheesesteak", priceCents: 1100, description: "Sliced ribeye, onions, melted provolone" },
      ],
    },
  },
  {
    name: "Taco's Don Memo",
    description: "Neighborhood staple for hefty tacos and burritos",
    cuisineType: "Mexican",
    imageUrl: "https://images.unsplash.com/photo-1608039829574-358155f866f5?auto=format&fit=crop&w=1200&q=80",
    defaultLocation: "270 S 38th St, Philadelphia, PA 19104",
    defaultLatitude: 39.9534,
    defaultLongitude: -75.1981,
    venmoHandle: "@donnemotacos",
    menuItems: {
      create: [
        { name: "Chicken Tacos", priceCents: 1400, description: "Three tacos with cilantro, onion, house salsa" },
        { name: "Beef Burrito", priceCents: 1400, description: "Flour tortilla loaded with rice, beans, and beef" },
      ],
    },
  },
];

async function main() {
  console.log("🌱 Seeding database...");
  await prisma.statusUpdate.deleteMany();
  await prisma.menuReview.deleteMany();
  await prisma.menuItem.deleteMany();
  await prisma.ownerTruckAccess.deleteMany();
  await prisma.owner.deleteMany();
  await prisma.foodTruck.deleteMany();

  for (const truck of trucks) {
    const created = await prisma.foodTruck.create({ data: truck });
    await prisma.statusUpdate.create({
      data: {
        truckId: created.id,
        status: TruckStatus.OPEN,
        note: "Serving lunch until 3pm",
        reporterName: "StreetEats Team",
        source: StatusSource.ADMIN,
        reliability: 0.9,
        latitude: created.defaultLatitude,
        longitude: created.defaultLongitude,
      },
    });
  }

  const passwordHash = await bcrypt.hash(defaultOwner.password, 10);
  const owner = await prisma.owner.create({
    data: {
      name: defaultOwner.name,
      email: defaultOwner.email,
      passwordHash,
    },
  });

  const ownedTrucks = await prisma.foodTruck.findMany({ where: { name: { in: defaultOwner.trucks } } });
  for (const truck of ownedTrucks) {
    await prisma.ownerTruckAccess.create({
      data: {
        ownerId: owner.id,
        truckId: truck.id,
        role: "OWNER",
      },
    });
  }

  console.log(`👤 Default owner ready: ${defaultOwner.email} / ${defaultOwner.password}`);

  console.log("✅ Seed complete");
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
