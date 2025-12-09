import { motion, useAnimation } from "framer-motion";
import { FaArrowsRotate, FaHeadset, FaRegPaperPlane } from "react-icons/fa6";

const assuranceItems = [
  {
    id: 1,
    icon: <FaRegPaperPlane className="w-5 h-5" />,
    title: "Fast Shipping",
    description: "Free shipping on all orders over $50",
  },
  {
    id: 2,
    icon: <FaArrowsRotate className="w-5 h-5" />,
    title: "Money Back Guarantee",
    description: "30 days return policy for all orders",
  },
  {
    id: 3,
    icon: <FaHeadset className="w-5 h-5" />,
    title: "Online Support 24/7",
    description: "24/7 customer support via email, phone, and live chat",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { y: 10, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.4,
    },
  },
};

const Assurance = () => {
  return (
    <section className="py-12 md:py-16 bg-primary/5">
      <div className="max-w-5xl mx-auto px-4">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {assuranceItems.map((itemData) => {
            const controls = useAnimation();

            return (
              <motion.div
                key={itemData.id}
                variants={item}
                className="group relative bg-white p-6 rounded-lg border border-green-400/80 border-dotted transition-all text-center overflow-hidden"
                onHoverStart={() => {
                  if (itemData.id === 1) {
                    controls.start({
                      x: 60,
                      y: -60,
                      opacity: 0,
                      transition: { duration: 0.4 },
                    });
                  } else if (itemData.id === 2) {
                    controls.start({
                      rotate: 180,
                      transition: {
                        duration: 0.6,
                        type: "spring",
                        bounce: 0.4,
                      },
                    });
                  } else if (itemData.id === 3) {
                    controls.start({
                      x: [0, -10, 10, -10, 10, -5, 5, 0],
                      y: [0, 0, 0, 0, 0, 0, 0, 0],
                      transition: {
                        duration: 0.8,
                        times: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 1],
                        ease: "easeInOut",
                      },
                    });
                  } else {
                    controls.start({ scale: 1.1 });
                  }
                }}
                onHoverEnd={() => {
                  controls.start({
                    x: 0,
                    y: 0,
                    opacity: 1,
                    rotate: 0,
                    scale: 1,
                    transition: { duration: 0.3 },
                  });
                }}
              >
                <div className="relative">
                  <motion.div
                    className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center mx-auto mb-4"
                    animate={controls}
                  >
                    <span className="text-primary">{itemData.icon}</span>
                  </motion.div>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1.5">
                  {itemData.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {itemData.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Assurance;
