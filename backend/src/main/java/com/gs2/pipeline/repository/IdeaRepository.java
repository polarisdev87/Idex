package com.gs2.pipeline.repository;

import com.gs2.pipeline.domain.Idea;
import com.gs2.pipeline.domain.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.Set;

@Repository
public interface IdeaRepository extends JpaRepository<Idea, Long> {


    @Query(
            "SELECT i FROM Idea i WHERE " +
                    "i.submittedAt >= :submittedAtMsMin AND i.submittedAt <= :submittedAtMsMax AND " +
                    "i.votes >= :votesMin AND i.votes <= :votesMax AND " +
                    "i.expectedProfitInCents >= :profitMin AND i.expectedProfitInCents <= :profitMax AND " +
                    "i.expectedTtm >= :implementationTimeMsMin AND i.expectedTtm <= :implementationTimeMsMax AND " +
                    "i.stage in :stages " +
                    "ORDER BY i.submittedAt DESC"
    )
    List<Idea> findWithParamsOrderBySubmittedAt(@Param("submittedAtMsMin") Date submittedAtMsMin,
                                                @Param("submittedAtMsMax") Date submittedAtMsMax,
                                                @Param("votesMin") Long votesMin,
                                                @Param("votesMax") Long votesMax,
                                                @Param("profitMin") Long profitMin,
                                                @Param("profitMax") Long profitMax,
                                                @Param("implementationTimeMsMin") Long implementationTimeMsMin,
                                                @Param("implementationTimeMsMax") Long implementationTimeMsMax,
                                                @Param("stages") Set<String> stages);


    @Query(
            "SELECT i FROM Idea i WHERE " +
                    "i.submittedAt >= :submittedAtMsMin AND i.submittedAt <= :submittedAtMsMax AND " +
                    "i.votes >= :votesMin AND i.votes <= :votesMax AND " +
                    "i.expectedProfitInCents >= :profitMin AND i.expectedProfitInCents <= :profitMax AND " +
                    "i.expectedTtm >= :implementationTimeMsMin AND i.expectedTtm <= :implementationTimeMsMax AND " +
                    "i.stage in :stages " +
                    "ORDER BY i.votes DESC"
    )
    List<Idea> findWithParamsOrderByVotes(@Param("submittedAtMsMin") Date submittedAtMsMin,
                                          @Param("submittedAtMsMax") Date submittedAtMsMax,
                                          @Param("votesMin") Long votesMin,
                                          @Param("votesMax") Long votesMax,
                                          @Param("profitMin") Long profitMin,
                                          @Param("profitMax") Long profitMax,
                                          @Param("implementationTimeMsMin") Long implementationTimeMsMin,
                                          @Param("implementationTimeMsMax") Long implementationTimeMsMax,
                                          @Param("stages") Set<String> stages);



    @Query(
            value = "SELECT * FROM (" +
                    "SELECT DISTINCT ON (i.id) * FROM Idea i " +
                    "INNER JOIN idea_tag it ON (i.id = it.idea_id) " +
                    "INNER JOIN tag t ON (it.tag_id = t.id) WHERE " +
                    "t.name in :tags AND " +
                    "i.submitted_at >= :submittedAtMsMin AND i.submitted_at <= :submittedAtMsMax AND " +
                    "i.votes >= :votesMin AND i.votes <= :votesMax AND " +
                    "i.expected_profit_in_cents >= :profitMin AND i.expected_profit_in_cents <= :profitMax AND " +
                    "i.expected_ttm >= :implementationTimeMsMin AND i.expected_ttm <= :implementationTimeMsMax AND " +
                    "i.stage in :stages " +
                    "ORDER BY i.id DESC" +
                    ") r ORDER BY r.submitted_at DESC",
            nativeQuery = true
    )
    List<Idea> findWithParamsAndTagsOrderBySubmittedAt(@Param("tags") Set<String> tags,
                                                       @Param("submittedAtMsMin") Date submittedAtMsMin,
                                                       @Param("submittedAtMsMax") Date submittedAtMsMax,
                                                       @Param("votesMin") Long votesMin,
                                                       @Param("votesMax") Long votesMax,
                                                       @Param("profitMin") Long profitMin,
                                                       @Param("profitMax") Long profitMax,
                                                       @Param("implementationTimeMsMin") Long implementationTimeMsMin,
                                                       @Param("implementationTimeMsMax") Long implementationTimeMsMax,
                                                       @Param("stages") Set<String> stages);


    @Query(
            value = "SELECT * FROM (" +
                        "SELECT DISTINCT ON (i.id) * FROM Idea i " +
                        "INNER JOIN idea_tag it ON (i.id = it.idea_id) " +
                        "INNER JOIN tag t ON (it.tag_id = t.id) WHERE " +
                        "t.name in :tags AND " +
                        "i.submitted_at >= :submittedAtMsMin AND i.submitted_at <= :submittedAtMsMax AND " +
                        "i.votes >= :votesMin AND i.votes <= :votesMax AND " +
                        "i.expected_profit_in_cents >= :profitMin AND i.expected_profit_in_cents <= :profitMax AND " +
                        "i.expected_ttm >= :implementationTimeMsMin AND i.expected_ttm <= :implementationTimeMsMax AND " +
                        "i.stage in :stages " +
                        "ORDER BY i.id DESC" +
                    ") r ORDER BY r.votes DESC",
            nativeQuery = true
    )
    Collection<Idea> findWithParamsAndTagsOrderByVotes(@Param("tags") Set<String> tags,
                                                       @Param("submittedAtMsMin") Date submittedAtMsMin,
                                                       @Param("submittedAtMsMax") Date submittedAtMsMax,
                                                       @Param("votesMin") Long votesMin,
                                                       @Param("votesMax") Long votesMax,
                                                       @Param("profitMin") Long profitMin,
                                                       @Param("profitMax") Long profitMax,
                                                       @Param("implementationTimeMsMin") Long implementationTimeMsMin,
                                                       @Param("implementationTimeMsMax") Long implementationTimeMsMax,
                                                       @Param("stages") Set<String> stages);



    /**
     * 
     * 
     * Adding 
     * 
  select it.idea_id from idea_tag it inner join tag t on (it.tag_id = t.id) 
	where t.name in ('tag1','tag2')
	group by it.idea_id 
	having count(it.tag_id) =2 ;
	
	to check if the idea has all enumerated tags. The number "2" should be the count of the tags "tag1 tag2"
	
	
     * 
     * @param tags
     * 			The list of tags
     * @param tagsCount
     * 			The number of tags in the set
     * @param submittedAtMsMin
     * @param submittedAtMsMax
     * @param votesMin
     * @param votesMax
     * @param profitMin
     * @param profitMax
     * @param implementationTimeMsMin
     * @param implementationTimeMsMax
     * @param stages
     * @return
     */
    

    @Query(
            value = "SELECT * FROM (" +
                    "SELECT DISTINCT ON (i.id) * FROM Idea i " +
                    "INNER JOIN idea_tag it ON (i.id = it.idea_id) " +
                    "INNER JOIN tag t ON (it.tag_id = t.id) WHERE " +
                    "t.name in :tags AND " +
                    "i.submitted_at >= :submittedAtMsMin AND i.submitted_at <= :submittedAtMsMax AND " +
                    "i.votes >= :votesMin AND i.votes <= :votesMax AND " +
                    "i.expected_profit_in_cents >= :profitMin AND i.expected_profit_in_cents <= :profitMax AND " +
                    "i.expected_ttm >= :implementationTimeMsMin AND i.expected_ttm <= :implementationTimeMsMax AND " +
                    "i.stage in :stages AND " +
                    "i.id in "+
                    "   (select in_it.idea_id from idea_tag in_it "+
                    	"INNER JOIN tag in_t on (in_it.tag_id = in_t.id) " + 
                    		"where in_t.name in :tags " + 
                    		"group by in_it.idea_id " + 
                    		"having count(in_it.tag_id) = :tagsCount)"+
                    "ORDER BY i.id DESC" +
                    ") r ORDER BY r.submitted_at DESC",
            nativeQuery = true
    )
    List<Idea> findWithParamsAndFullTagsOrderBySubmittedAt(@Param("tags") Set<String> tags,
    												   @Param("tagsCount") Integer tagsCount,
                                                       @Param("submittedAtMsMin") Date submittedAtMsMin,
                                                       @Param("submittedAtMsMax") Date submittedAtMsMax,
                                                       @Param("votesMin") Long votesMin,
                                                       @Param("votesMax") Long votesMax,
                                                       @Param("profitMin") Long profitMin,
                                                       @Param("profitMax") Long profitMax,
                                                       @Param("implementationTimeMsMin") Long implementationTimeMsMin,
                                                       @Param("implementationTimeMsMax") Long implementationTimeMsMax,
                                                       @Param("stages") Set<String> stages);


    @Query(
            value = "SELECT * FROM (" +
                        "SELECT DISTINCT ON (i.id) * FROM Idea i " +
                        "INNER JOIN idea_tag it ON (i.id = it.idea_id) " +
                        "INNER JOIN tag t ON (it.tag_id = t.id) WHERE " +
                        "t.name in :tags AND " +
                        "i.submitted_at >= :submittedAtMsMin AND i.submitted_at <= :submittedAtMsMax AND " +
                        "i.votes >= :votesMin AND i.votes <= :votesMax AND " +
                        "i.expected_profit_in_cents >= :profitMin AND i.expected_profit_in_cents <= :profitMax AND " +
                        "i.expected_ttm >= :implementationTimeMsMin AND i.expected_ttm <= :implementationTimeMsMax AND " +
	                    "i.stage in :stages AND " +
	                    "i.id in "+
	                    "   (select in_it.idea_id from idea_tag in_it "+
	                    	"INNER JOIN tag in_t on (in_it.tag_id = in_t.id) " + 
	                    		"where in_t.name in :tags " + 
	                    		"group by in_it.idea_id " + 
	                    		"having count(in_it.tag_id) = :tagsCount)"+
	                    "ORDER BY i.id DESC" +
                    ") r ORDER BY r.votes DESC",
            nativeQuery = true
    )
    Collection<Idea> findWithParamsAndFullTagsOrderByVotes(@Param("tags") Set<String> tags,
    												   @Param("tagsCount") Integer tagsCount,
                                                       @Param("submittedAtMsMin") Date submittedAtMsMin,
                                                       @Param("submittedAtMsMax") Date submittedAtMsMax,
                                                       @Param("votesMin") Long votesMin,
                                                       @Param("votesMax") Long votesMax,
                                                       @Param("profitMin") Long profitMin,
                                                       @Param("profitMax") Long profitMax,
                                                       @Param("implementationTimeMsMin") Long implementationTimeMsMin,
                                                       @Param("implementationTimeMsMax") Long implementationTimeMsMax,
                                                       @Param("stages") Set<String> stages);



}
