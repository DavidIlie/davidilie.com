/* eslint-disable @next/next/no-img-element */
import { NextPage, GetStaticPaths, GetStaticProps } from "next";
import { Formik, Form, Field } from "formik";
import React, { useState } from "react";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import Image from "next/image";
import { format, parseISO } from "date-fns";
import { useSession } from "next-auth/react";

import { trpc } from "@/lib/trpc";
import { getFileBySlug, getAllFilesFrontMatter } from "@/lib/mdx";
import { shimmer } from "@/lib/shimmer";
import MDXComponents from "@/components/MDXComponents";
import BlogTags from "@/components/BlogComponents/Tags";
import ViewCounter from "@/components/BlogComponents/ViewCounter";
import Button from "@/components/Button";
import Linkify from "@/components/BlogComponents/Linkify";
import Tooltip from "@/components/Tooltip";

interface frontMatterProps {
   image: string;
   publishedAt: string;
   readingTime: {
      minutes: number;
      text: string;
      time: number;
   };
   slug: string;
   summary: string;
   tags: [string];
   title: string;
   wordCount: number;
   published: boolean;
}

const BlogPost: NextPage<{ mdxSource: any; frontMatter: frontMatterProps }> = ({
   mdxSource,
   frontMatter,
}) => {
   const router = useRouter();
   const { data } = useSession();
   const [formSuccess, setFormSuccess] = useState(false);

   if (!frontMatter) return <div />;

   const utils = trpc.useContext();
   const blogStats = trpc.useQuery([
      "blog.getStats",
      { slug: frontMatter.slug },
   ]);
   const blogComments = trpc.useQuery([
      "blog.getComments",
      { slug: frontMatter.slug },
   ]);
   const createComment = trpc.useMutation(["blog.createComment"]);
   const deleteComment = trpc.useMutation(["blog.deleteComment"]);

   return (
      <>
         <NextSeo
            title={frontMatter.title}
            description={frontMatter.summary}
            canonical={`https://davidilie.com/${router.asPath}`}
            twitter={{
               cardType: "summary_large_image",
               site: "@AlbastruYT",
            }}
            openGraph={{
               title: frontMatter.title,
               site_name: "David Ilie",
               description: frontMatter.summary,
               url: `https://davidilie.com/${router.asPath}`,
               type: "article",
               article: {
                  publishedTime: new Date(
                     frontMatter.publishedAt
                  ).toISOString(),
               },
               images: [
                  {
                     url: frontMatter.image,
                  },
               ],
            }}
         />
         <div className="flex items-center justify-center flex-grow sm:px-6 lg:px-8">
            <div className="container max-w-3xl mx-auto mt-28">
               <div className="flex flex-wrap justify-start w-full px-3 mb-4">
                  {frontMatter.tags.map((tag, i) => (
                     <BlogTags tag={tag} key={i.toString()} />
                  ))}
               </div>
               <h1 className="px-4 text-4xl font-medium sm:text-5xl">
                  {frontMatter.title}
               </h1>
               <div className="flex flex-wrap items-center justify-between w-full max-w-3xl px-3 mt-2 mb-5 border-b-2">
                  <div className="flex items-center">
                     <span className="inline-flex items-center justify-center py-2 text-xs font-bold leading-none rounded-md">
                        <Image
                           className="rounded-full"
                           src="/static/me.png"
                           width="35px"
                           height="35px"
                           blurDataURL={shimmer(1920, 1080)}
                           alt="David's profile image"
                        />
                        <span className="ml-2 mr-1 text-lg header-gradient">
                           David Ilie
                        </span>
                     </span>
                     <h1 className="text-gray-800 dark:text-gray-300">
                        {" / "}
                        {format(
                           parseISO(frontMatter.publishedAt),
                           "MMMM dd, yyyy"
                        )}
                     </h1>
                  </div>
                  <h1>
                     {frontMatter.wordCount.toLocaleString() + " words"}
                     {` • `}
                     {frontMatter.readingTime?.text}
                     {` • `}
                     {!blogStats.isLoading && blogStats.data && (
                        <ViewCounter
                           slug={frontMatter.slug}
                           views={blogStats.data.views}
                        />
                     )}
                  </h1>
               </div>
               <div className="px-2 mx-auto">
                  <Image
                     alt="Post picture"
                     className="shadow-xl rounded-xl"
                     src={frontMatter.image}
                     width={1080}
                     height={551}
                     blurDataURL={shimmer(1920, 1080)}
                     placeholder="blur"
                  />
               </div>
               <div className="w-full max-w-5xl px-2 mt-3 mb-5 blog-content">
                  <MDXRemote {...mdxSource} components={{ ...MDXComponents }} />
               </div>
               <div className="px-2 mt-2 border-t-2">
                  <h1 className="mt-4 text-4xl font-medium header-gradient pb-2 -mb-1">
                     What do you think?
                  </h1>
                  <div className="w-full p-6 my-4 border border-gray-200 rounded bg-gray-50 dark:border-gray-700 dark:bg-gray-800">
                     <h5 className="text-lg font-semibold text-gray-900 dark:text-gray-100 md:text-xl">
                        Leave a comment
                     </h5>
                     <p className="my-1 text-gray-800 dark:text-gray-200">
                        Share your opinion regarding this post for other people
                        to see.
                     </p>
                     <div className="mt-2">
                        {!data ? (
                           <Link
                              href={`/sign-in?returnUrl=${encodeURIComponent(
                                 router.asPath
                              )}`}
                           >
                              <a>
                                 <Button>Sign In</Button>
                              </a>
                           </Link>
                        ) : !data?.user?.canComment ? (
                           <p className="font-semibold text-red-500">
                              You are currently restricted from commenting.
                           </p>
                        ) : (
                           <Formik
                              validateOnChange={false}
                              validateOnBlur={false}
                              initialValues={{
                                 message: "",
                              }}
                              onSubmit={async (
                                 data,
                                 { setSubmitting, setFieldError, resetForm }
                              ) => {
                                 setSubmitting(true);

                                 await createComment.mutateAsync(
                                    {
                                       slug: frontMatter.slug,
                                       comment: data.message,
                                    },
                                    {
                                       onError: () => {
                                          setFieldError(
                                             "message",
                                             createComment.error!.message
                                          );
                                       },
                                       onSuccess: () => {
                                          resetForm();
                                          setFormSuccess(true);
                                          setInterval(
                                             () => setFormSuccess(false),
                                             2000
                                          );
                                          utils.invalidateQueries([
                                             "blog.getComments",
                                          ]);
                                       },
                                    }
                                 );

                                 setSubmitting(false);
                              }}
                           >
                              {({ errors, isSubmitting }) => (
                                 <Form>
                                    <Field
                                       as="input"
                                       aria-label="Your comment"
                                       placeholder="Your comment..."
                                       required
                                       name="message"
                                       className="block w-full py-2 pl-4 pr-32 mt-1 text-gray-900 bg-gray-100 border-2 border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500 dark:border-gray-800 dark:bg-gray-900 dark:bg-opacity-50 dark:text-gray-100 dark:focus:border-blue-900 dark:focus:ring-blue-900"
                                    />
                                    <Button
                                       className="w-full mt-2 mb-2"
                                       type="submit"
                                       disabled={isSubmitting}
                                       loading={isSubmitting}
                                    >
                                       Comment
                                    </Button>
                                    {errors.message ? (
                                       <ErrorMessage>
                                          {errors.message}
                                       </ErrorMessage>
                                    ) : formSuccess ? (
                                       <SuccessMessage>
                                          Success! Your comment has been
                                          published successfully!
                                       </SuccessMessage>
                                    ) : (
                                       <p className="text-sm text-gray-800 dark:text-gray-200">
                                          Your information is only used to
                                          display your name and reply by email.
                                       </p>
                                    )}
                                 </Form>
                              )}
                           </Formik>
                        )}
                     </div>
                  </div>
                  <div className="mt-6 mb-6">
                     {blogComments.isLoading && !blogComments.data ? (
                        <div>Loading...</div>
                     ) : (
                        blogComments.data?.map((comment, index) => (
                           <div
                              className={`flex gap-4 rounded-md border border-gray-200 bg-gray-50 py-4 px-4 dark:border-gray-700 dark:bg-gray-800 ${
                                 index !== blogComments.data?.length - 1 &&
                                 "mb-4"
                              }`}
                              key={index}
                           >
                              <img
                                 src={comment.user.image || ""}
                                 width={55}
                                 height={24}
                                 // blurDataURL={shimmer(10, 10)}
                                 placeholder="blur"
                                 className="object-cover rounded-full"
                                 alt={`${comment.user.name}'s profile image`}
                              />
                              <div className="space-y-1">
                                 <div className="w-full">
                                    <Linkify>{comment.comment}</Linkify>
                                 </div>
                                 <div className="flex items-center space-x-2">
                                    <Link href={`/profile/${comment.user?.id}`}>
                                       <a className="text-sm text-gray-500 duration-150 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-500">
                                          {comment.user.name}
                                       </a>
                                    </Link>
                                    <span className="text-gray-800 dark:text-gray-200">
                                       /
                                    </span>
                                    <p className="text-sm text-gray-400 dark:text-gray-300">
                                       {format(
                                          new Date(comment.createdAt),
                                          "d MMM yyyy 'at' h:mm bb"
                                       )}
                                    </p>
                                    {(comment.userId === data?.user?.id ||
                                       data?.user?.isAdmin) &&
                                    deleteComment.isError ? (
                                       <>
                                          <span className="text-gray-800 dark:text-gray-200">
                                             /
                                          </span>
                                          <p className="text-sm text-red-600 dark:text-red-500">
                                             Error deleting comment.
                                          </p>
                                       </>
                                    ) : (
                                       <>
                                          <span className="text-gray-800 dark:text-gray-200">
                                             /
                                          </span>
                                          <Tooltip content="Double click to confirm">
                                             <button
                                                className="text-sm text-red-600 dark:text-red-500"
                                                onDoubleClick={() =>
                                                   !deleteComment.isLoading &&
                                                   deleteComment.mutate(
                                                      { id: comment.id },
                                                      {
                                                         onSuccess: () =>
                                                            utils.invalidateQueries(
                                                               [
                                                                  "blog.getComments",
                                                               ]
                                                            ),
                                                      }
                                                   )
                                                }
                                             >
                                                {deleteComment.isLoading
                                                   ? "Deleting"
                                                   : "Delete"}
                                             </button>
                                          </Tooltip>
                                       </>
                                    )}
                                 </div>
                              </div>
                           </div>
                        ))
                     )}
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};

export const getStaticPaths: GetStaticPaths = async () => {
   let posts = await getAllFilesFrontMatter();

   if (process.env.NODE_ENV === "production")
      posts = posts.filter((p) => p.published);
   const slugPosts = posts.map((p) => p.slug);

   return {
      paths: slugPosts.map((p) => ({
         params: {
            slug: p,
         },
      })),
      fallback: true,
   };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
   const post = await getFileBySlug(`blog`, (params as any).slug);

   return { props: { ...post } };
};

const SuccessMessage: React.FC<{
   children: React.ReactNode;
}> = ({ children }) => {
   return (
      <p className="flex items-center text-sm font-semibold text-green-500">
         <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-4 h-4 mr-2"
         >
            <path
               fillRule="evenodd"
               d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
               clipRule="evenodd"
            />
         </svg>
         {children}
      </p>
   );
};

const ErrorMessage: React.FC<{
   children: React.ReactNode;
}> = ({ children }) => {
   return (
      <p className="flex items-center text-sm font-semibold text-red-500">
         <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-4 h-4 mr-2"
         >
            <path
               fillRule="evenodd"
               d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
               clipRule="evenodd"
            />
         </svg>
         {children}
      </p>
   );
};

export default BlogPost;
